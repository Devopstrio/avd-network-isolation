import pytest
from fastapi.testclient import TestClient
from backend.src.main import app

# Devopstrio AVD Network Isolation
# Integration Tests for Secure Segmentation & Topology Orchestration

client = TestClient(app)

def test_health_check_operational():
    """Verify that the isolation gateway is healthy and security components are online."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["firewall_active"] is True

def test_topology_inventory_retrieval():
    """Ensure the platform can retrieve the global hub-spoke network map."""
    response = client.get("/topology")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert data[0]["type"] == "Hub"

def test_segmentation_deployment_trigger():
    """Verify that a request to deploy an isolated segment is correctly accepted."""
    payload = {
        "name": "vnet-restricted-finance",
        "region": "uksouth",
        "cidr": "10.42.0.0/24",
        "isolation_level": "Restricted"
    }
    response = client.post("/segments/deploy", json=payload)
    assert response.status_code == 202
    assert "job_id" in response.json()
    assert response.json()["status"] == "Provisioning"

def test_firewall_policy_application():
    """Ensure firewall rules can be programmatically enforced across the hub."""
    payload = {
        "policy_name": "Finance-Hardening-Ring",
        "rules": [
            {"name": "Allow-Finance-SQL", "port": 1433, "action": "Allow"}
        ],
        "environment": "Prod"
    }
    response = client.post("/firewall/rules/apply", json=payload)
    assert response.status_code == 200
    assert response.json()["status"] == "Enforced"

def test_connectivity_diagnostics_probe():
    """Verify the real-time reachability diagnostic probe."""
    payload = {
        "source_vnet": "vnet-finance",
        "target_endpoint": "corp-db-01.internal"
    }
    response = client.post("/connectivity/tests", json=payload)
    assert response.status_code == 200
    assert response.json()["reachable"] is True
    assert "path" in response.json()

def test_analytics_summary_reporting():
    """Check that network security and bandwidth analytics are reportable."""
    response = client.get("/analytics/summary")
    assert response.status_code == 200
    assert "threats_blocked_24h" in response.json()
