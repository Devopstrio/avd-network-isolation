<div align="center">

<img src="https://raw.githubusercontent.com/Devopstrio/.github/main/assets/Browser_logo.png" height="90" alt="Devopstrio Logo" />

<h1>Azure Virtual Desktop (AVD) Network Isolation</h1>

<p><strong>Zero-Trust Network Segmentation, Secure Connectivity & Multi-Region Containment</strong></p>

[![Security](https://img.shields.io/badge/Strategy-Zero_Trust-522c72?style=for-the-badge&labelColor=000000)](https://devopstrio.co.uk/)
[![Networking](https://img.shields.io/badge/Topology-Hub_Spoke-0078d4?style=for-the-badge&logo=microsoftazure&labelColor=000000)](https://devopstrio.co.uk/)
[![Compliance](https://img.shields.io/badge/Governance-Isolated_Workloads-success?style=for-the-badge&labelColor=000000)](https://devopstrio.co.uk/)
[![Firewall](https://img.shields.io/badge/Inspection-L7_Filtering-962964?style=for-the-badge&labelColor=000000)](/apps/inspection-engine)

</div>

---

## 🏛️ Executive Summary

The **AVD Network Isolation** platform is a flagship enterprise security foundation designed to deliver granular network segmentation and zero-trust connectivity for Azure Virtual Desktop (AVD) environments. In an era of sophisticated lateral movement threats, simple VNET-to-VNET connectivity is no longer sufficient. This platform provides the architectural guardrails to isolate developer labs, finance workstations, and contractor environments with absolute precision.

By automating the construction of **Hub-Spoke** topologies, **Private Link** integrations, and **Layer 7 Firewall Polices**, this platform ensures that traffic is inspected, authenticated, and authorized at every hop. It eliminates the need for public IP addresses on session hosts and enforces a "private-only" access pattern for both management and user traffic. The platform includes a dedicated Network Operations Command Center for real-time topology visualization, connectivity diagnostics, and policy drift remediation.

### Strategic Business Outcomes
- **Zero-Trust Connectivity**: Implement a "Deny-by-Default" posture across the entire global desktop fleet, reducing the lateral attack surface.
- **Regulated Workload Isolation**: Provide physically or logically isolated "Sovereign Zones" for highly sensitive banking, healthcare, or government desktops.
- **Improved Security Posture**: Enforce mandatory traffic inspection via Azure Firewall and centralized NVA clusters with automated rule lifecycle management.
- **Optimized Latency**: Accelerate connectivity through regional breakout and optimized routing tables, ensuring the best possible user experience for global engineering teams.

---

## 🏗️ Technical Architecture Details

### 1. High-Level Hub-Spoke Architecture
```mermaid
graph TD
    Internet[Public Internet] --> FW[Azure Firewall Hub]
    FW --> P2S[Point-to-Site VPN]
    FW --> S2S[Site-to-Site ExpressRoute]
    
    FW --> Spoke1[VDI Spoke A: General]
    FW --> Spoke2[VDI Spoke B: Reserved]
    FW --> Spoke3[VDI Spoke C: Contractor]
    
    subgraph "Hub Management Cluster"
        FW
        Id[Identity Layer]
        DNS[Private DNS Resolver]
    end
    
    subgraph "Isolated Spokes"
        Spoke1
        Spoke2
        Spoke3
    end
```

### 2. Hub-Spoke Deployment Workflow
```mermaid
sequenceDiagram
    participant Admin as Network Architect
    participant API as Isolation API
    participant Net as Network Engine
    participant TF as Terraform Core
    participant Azure as Azure ARM

    Admin->>API: Provision Isolated Segment (Finance)
    API->>Net: Calculate Address & Route Table
    Net->>TF: Generate Spoke Module
    TF->>Azure: Deploy VNET, Peer to Hub, Apply NSG
    Azure-->>Admin: Segment Active & Isolated
```

### 3. Firewall Inspection Flow (East-West)
```mermaid
graph LR
    User[Session Host A] --> RT[Route Table: 0.0.0.0/0 -> FW]
    RT --> FW[Azure Firewall Hub]
    FW --> Policy[L7 IDPS Check]
    Policy --> Target[Internal Database / Host B]
```

### 4. Private Endpoint Lifecycle
```mermaid
graph TD
    Request[App Access Request] --> Prov[Provision Private Endpoint]
    Prov --> DNS[Register in Private DNS Zone]
    DNS --> Access[Secure Internal Access Only]
```

### 5. Connectivity Diagnostics Workflow
```mermaid
graph TD
    Issue[User Connection Fail] --> Probe[Network Watcher Reachability]
    Probe --> Analyze[Inspect NSG & Route Table]
    Analyze --> Report[Identify Blocked Rule]
```

### 6. Security Trust Boundary
```mermaid
graph TD
    Entry[External Gateway] --> MFA[MFA Enforcement]
    MFA --> ZoneA[High-Trust Spoke]
    MFA --> ZoneB[Restricted Spoke]
    ZoneA -.-|Isolated| ZoneB
```

### 7. AVD Global Topology
```mermaid
graph LR
    Sync[Global Sync] --> EU[EMEA Hub]
    Sync --> US[US Hub]
    EU --> Pool1[UK South Pool]
    US --> Pool2[East US Pool]
```

### 8. API Request Lifecycle
```mermaid
graph LR
    Call[GET /topology] --> Auth[JWT SSO]
    Auth --> Service[Topology Aggregator]
    Service --> Cache[Redis State]
    Cache --> Response[JSON Map]
```

### 9. Multi-Tenant Tenancy Model
```mermaid
graph TD
    Top[Enterprise Management]
    Top --> BU1[Finance BU]
    Top --> BU2[Engineering BU]
    BU1 --> Seg1[Isolated VNET A]
```

### 10. Monitoring & Telemetry Flow
```mermaid
graph LR
    Flow[NSG Flow Logs] --> Stats[Traffic Analytics]
    Stats --> Dashboard[Security Insight Board]
```

### 11. Disaster Recovery Topology
```mermaid
graph TD
    Prod[Region 1: Active] --> Peering[Global VNET Peering]
    Peering --> DR[Region 2: Standby]
    Prod -.->|Regional Outage| Failover[Route Redirect to DR]
```

### 12. DNS Failover Workflow
```mermaid
graph LR
    Primary[Private DNS Zone: uksouth] --> Sync[Global Sync]
    Sync --> Secondary[Private DNS Zone: ukwest]
```

### 13. Identity Federation Model
```mermaid
graph LR
    User[Contractor] --> Entra[Microsoft Entra B2B]
    Entra --> NSG[Dynamic NSG Allow Rule]
    NSG --> Session[Isolated Session Access]
```

### 14. Contractor Isolated Zone Flow
```mermaid
graph TD
    Ext[Guest User] --> Portal[AVD Client]
    Portal --> Spoke[Contractor Spoke]
    Spoke -->|FW Filter| Apps[Restricted App Group Only]
```

### 15. CI/CD Infrastructure Pipeline
```mermaid
graph LR
    Commit[Network Update] --> Lint[Terraform Lint]
    Lint --> Scan[Policy Compliance Scan]
    Scan --> Apply[Global Resource Rollout]
```

### 16. Executive Governance Workflow
```mermaid
graph TD
    Metric[Network Risk Score] --> CISO[CISO Board Review]
    CISO --> Approve[Segment Expansion]
```

### 17. Region Expansion Topology
```mermaid
graph LR
    Hub[Central Hub] --> PeerA[New Region VNET]
    PeerA --> Gate[Local Regional Hub]
```

### 18. Route Propagation Flow
```mermaid
graph TD
    UDR[User Defined Route] --> Prop[BGP Propagation Blocked]
    Prop --> Force[Forced Tunneling to Hub FW]
```

### 19. Global Region Topology
```mermaid
graph TD
    World[Global Control Plane]
    World --> NodeEU[London Node]
    World --> NodeUS[New York Node]
```

### 20. Policy Drift Remediation
```mermaid
graph TD
    Detect[NSG Rule Manual Change] --> Alert[Platform Audit engine]
    Alert --> Revert[Restore Infrastructure from Git]
```

---

## 🚀 Experience The Platform

### Terraform Global Rollout
```bash
cd terraform/environments/prd
terraform init
terraform apply -auto-approve
```

---
<sub>&copy; 2026 Devopstrio &mdash; Engineering the Secure Zero-Trust Backbone for the Global Remote Workforce.</sub>
