"use client";

import { useState } from "react";

const slideUpAnimation = `
  @keyframes slideUp {
    from {
      transform: translateX(-50%) translateY(100%);
    }
    to {
      transform: translateX(-50%) translateY(0);
    }
  }
`;

type AddressTablePopupProps = {
  mode: 'table' | 'address' | 'addAddress';
  onClose: () => void;
  onModeChange?: (mode: 'table' | 'address' | 'addAddress') => void;
  onSelectTable?: (table: string) => void;
  onSelectAddress?: (address: any) => void;
  onSaveAddress?: (address: any) => void;
};

export default function AddressTablePopup({ 
  mode, 
  onClose,
  onModeChange,
  onSelectTable, 
  onSelectAddress,
  onSaveAddress 
}: AddressTablePopupProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [newAddress, setNewAddress] = useState({
    country: "",
    street: "",
    building: "",
    apartment: "",
    no: "",
    floor: "",
    description: "",
    allowLocation: false,
    label: ""
  });

  const tables = Array.from({ length: 20 }, (_, i) => `Table ${i + 1}`);
  const filteredTables = tables.filter(table => 
    table.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const savedAddresses = [
    { id: 1, label: "Home", description: "Gaziler Mah. 1711 Sok. No:5" },
    { id: 2, label: "Work", description: "İşyeri Adresi" }
  ];

  const addressLabels = ["Home", "Office", "Store"];

  const handleTableSelect = (table: string) => {
    setSelectedTable(table);
    if (onSelectTable) {
      onSelectTable(table);
    }
    onClose();
  };

  const handleAddressSelect = (address: any) => {
    setSelectedAddress(address);
    if (onSelectAddress) {
      onSelectAddress(address);
    }
    onClose();
  };

  const handleSaveAddress = () => {
    if (onSaveAddress) {
      onSaveAddress(newAddress);
    }
    onClose();
  };

  return (
    <>
      <style>{slideUpAnimation}</style>
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998
        }}
      />
      <div style={{
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 40px)',
        maxWidth: '500px',
        maxHeight: '80vh',
        backgroundColor: '#fff',
        borderRadius: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'slideUp 0.3s ease-out',
        boxSizing: 'border-box'
      }}>
        {/* Handle Bar */}
        <div style={{
          width: '40px',
          height: '4px',
          backgroundColor: '#d1d5db',
          borderRadius: '2px',
          margin: '12px auto',
          flexShrink: 0
        }} />

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px 16px 20px',
          flexShrink: 0
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#000',
            margin: 0
          }}>
            {mode === 'table' ? 'Select Table' : mode === 'address' ? 'Select Address' : 'Add new address'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={{
          overflowY: 'auto',
          flex: 1,
          padding: '0 20px 20px 20px',
          minHeight: 0
        }}>
          {mode === 'table' && (
            <>
              {/* Search Bar */}
              <div style={{
                marginBottom: '16px'
              }}>
                <input
                  type="text"
                  placeholder="Search tables..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Table List */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {filteredTables.map((table) => (
                  <div
                    key={table}
                    onClick={() => handleTableSelect(table)}
                    style={{
                      padding: '16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      backgroundColor: selectedTable === table ? '#f9fafb' : '#fff',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <span style={{
                      fontSize: '16px',
                      color: '#000',
                      fontWeight: '500'
                    }}>
                      {table}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {mode === 'address' && (
            <>
              {/* Saved Addresses */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '20px'
              }}>
                {savedAddresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => handleAddressSelect(address)}
                    style={{
                      padding: '16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      backgroundColor: selectedAddress?.id === address.id ? '#f9fafb' : '#fff'
                    }}
                  >
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#000',
                      marginBottom: '4px'
                    }}>
                      {address.label}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>
                      {address.description}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Address Button */}
              <button
                onClick={() => {
                  if (onModeChange) {
                    onModeChange('addAddress');
                  }
                }}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Add new address
              </button>
            </>
          )}

          {mode === 'addAddress' && (
            <>
              {/* Country Dropdown */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  Country
                </label>
                <select
                  value={newAddress.country}
                  onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Select country</option>
                  <option value="tr">Turkey</option>
                  <option value="us">United States</option>
                </select>
              </div>

              {/* Street */}
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="text"
                  placeholder="Street"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Building, Apartment, No */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <input
                  type="text"
                  placeholder="Building"
                  value={newAddress.building}
                  onChange={(e) => setNewAddress({ ...newAddress, building: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
                <input
                  type="text"
                  placeholder="Apartment"
                  value={newAddress.apartment}
                  onChange={(e) => setNewAddress({ ...newAddress, apartment: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
                <input
                  type="text"
                  placeholder="No"
                  value={newAddress.no}
                  onChange={(e) => setNewAddress({ ...newAddress, no: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Floor, Description */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <input
                  type="text"
                  placeholder="Floor"
                  value={newAddress.floor}
                  onChange={(e) => setNewAddress({ ...newAddress, floor: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newAddress.description}
                  onChange={(e) => setNewAddress({ ...newAddress, description: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Allow Location Toggle */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '24px',
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '12px'
              }}>
                <input
                  type="checkbox"
                  checked={newAddress.allowLocation}
                  onChange={(e) => setNewAddress({ ...newAddress, allowLocation: e.target.checked })}
                  style={{
                    marginTop: '2px',
                    flexShrink: 0
                  }}
                />
                <div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#000',
                    marginBottom: '4px'
                  }}>
                    Allow access to location
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    We'll use your location to show nearby restaurants and delivery options.
                  </div>
                </div>
              </div>

              {/* Address Labels */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#000',
                  marginBottom: '12px'
                }}>
                  Address Label
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {addressLabels.map((label) => (
                    <button
                      key={label}
                      onClick={() => setNewAddress({ ...newAddress, label })}
                      style={{
                        padding: '8px 16px',
                        border: newAddress.label === label ? '2px solid #000' : '1px solid #e5e7eb',
                        borderRadius: '20px',
                        backgroundColor: newAddress.label === label ? '#f9fafb' : '#fff',
                        fontSize: '14px',
                        color: '#000',
                        cursor: 'pointer'
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveAddress}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Save Address
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

