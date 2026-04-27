-- Devopstrio AVD Network Isolation
-- Core Network Governance & Topology Schema
-- Target: PostgreSQL 15+

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Identity & Tenancy
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    azure_tenant_id VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'NetworkAdmin', -- NetworkAdmin, SecurityLead, Auditor
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Infrastructure Topology
CREATE TABLE IF NOT EXISTS regions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    region_name VARCHAR(100) NOT NULL, -- uksouth, eastus
    hub_vnet_id VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vnets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    region_id UUID REFERENCES regions(id),
    name VARCHAR(255) NOT NULL,
    vnet_id VARCHAR(255) UNIQUE NOT NULL,
    address_space TEXT[] NOT NULL,
    vnet_type VARCHAR(50) DEFAULT 'Spoke', -- Hub, Spoke, Isolated
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subnets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vnet_id UUID REFERENCES vnets(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address_prefix VARCHAR(50) NOT NULL,
    security_group_id VARCHAR(255),
    route_table_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Connectivity & Peering
CREATE TABLE IF NOT EXISTS peerings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_vnet_id UUID REFERENCES vnets(id),
    target_vnet_id UUID REFERENCES vnets(id),
    status VARCHAR(50) DEFAULT 'Connected', -- Connected, Disconnected
    peering_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Governance & Policy
CREATE TABLE IF NOT EXISTS policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    name VARCHAR(255) NOT NULL,
    policy_type VARCHAR(50), -- NSG, Firewall, DNS
    definition JSONB NOT NULL,
    is_enforced BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS firewall_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    rule_name VARCHAR(255) NOT NULL,
    action VARCHAR(20) DEFAULT 'Allow', -- Allow, Deny
    source_address TEXT,
    target_address TEXT,
    port_range VARCHAR(50),
    priority INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Diagnostics & Analytics
CREATE TABLE IF NOT EXISTS connectivity_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_resource VARCHAR(255),
    target_endpoint VARCHAR(255),
    status VARCHAR(50), -- Reachable, Unreachable
    latency_ms FLOAT,
    path_details JSONB,
    tested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Audit & History
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    resource_id VARCHAR(255),
    change_diff JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Strategic Indexes
CREATE INDEX idx_vnet_region ON vnets(region_id);
CREATE INDEX idx_subnet_vnet ON subnets(vnet_id);
CREATE INDEX idx_peering_source ON peerings(source_vnet_id);
CREATE INDEX idx_policy_tenant ON policies(tenant_id);
CREATE INDEX idx_fw_priority ON firewall_rules(priority);
CREATE INDEX idx_conn_test_time ON connectivity_tests(tested_at);
