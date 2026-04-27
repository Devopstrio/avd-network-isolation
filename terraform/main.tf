# Devopstrio AVD Network Isolation
# Hub-Spoke Security Foundation (Terraform)
# Target: Azure RM

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.90"
    }
  }
}

provider "azurerm" {
  features {}
}

# 1. Management Hub Resource Group
resource "azurerm_resource_group" "hub_rg" {
  name     = "rg-avd-network-hub-prd"
  location = "uksouth"
  tags = {
    Role       = "Security-Hub"
    Automation = "Isolator"
  }
}

# 2. Central Hub Virtual Network
resource "azurerm_virtual_network" "hub_vnet" {
  name                = "vnet-avd-mgt-hub"
  address_space       = ["10.10.0.0/16"]
  location            = azurerm_resource_group.hub_rg.location
  resource_group_name = azurerm_resource_group.hub_rg.name
}

# 3. Azure Firewall Subnet (Required Name)
resource "azurerm_subnet" "fw_subnet" {
  name                 = "AzureFirewallSubnet"
  resource_group_name  = azurerm_resource_group.hub_rg.name
  virtual_network_name = azurerm_virtual_network.hub_vnet.name
  address_prefixes     = ["10.10.1.0/24"]
}

# 4. Azure Firewall (The Traffic Controller)
resource "azurerm_public_ip" "fw_pip" {
  name                = "pip-avd-hub-firewall"
  location            = azurerm_resource_group.hub_rg.location
  resource_group_name = azurerm_resource_group.hub_rg.name
  allocation_method   = "Static"
  sku                 = "Standard"
}

resource "azurerm_firewall" "hub_fw" {
  name                = "afw-avd-global-hub"
  location            = azurerm_resource_group.hub_rg.location
  resource_group_name = azurerm_resource_group.hub_rg.name
  sku_name            = "AZFW_VNet"
  sku_tier            = "Premium" # Required for TLS Inspection & IDPS

  ip_configuration {
    name                 = "configuration"
    subnet_id            = azurerm_subnet.fw_subnet.id
    public_ip_address_id = azurerm_public_ip.fw_pip.id
  }
}

# 5. Route Table (Forcing Spoke traffic through Firewall)
resource "azurerm_route_table" "spoke_udr" {
  name                          = "rt-avd-spoke-to-hub"
  location                      = azurerm_resource_group.hub_rg.location
  resource_group_name           = azurerm_resource_group.hub_rg.name
  disable_bgp_route_propagation = true

  route {
    name                   = "ForceTunnelToFirewall"
    address_prefix         = "0.0.0.0/0"
    next_hop_type          = "VirtualAppliance"
    next_hop_in_ip_address = azurerm_firewall.hub_fw.ip_configuration[0].private_ip_address
  }
}

# 6. Private DNS Zones (Internal Name Resolution)
resource "azurerm_private_dns_zone" "avd_dns" {
  name                = "privatelink.wvd.microsoft.com"
  resource_group_name = azurerm_resource_group.hub_rg.name
}

# Outputs
output "hub_firewall_ip" {
  value = azurerm_firewall.hub_fw.ip_configuration[0].private_ip_address
}

output "route_table_id" {
  value = azurerm_route_table.spoke_udr.id
}
