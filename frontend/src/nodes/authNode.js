import { useState } from 'react';
import { BaseNode } from './baseNode';

export const AuthNode = ({ id, data }) => {
  const [authType, setAuthType] = useState(data?.authType || 'API Key');
  const [apiKey, setApiKey] = useState(data?.apiKey || '');

  const handleTypeChange = (e) => {
    setAuthType(e.target.value);
  };

  const handleKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Authentication"
      sourceHandles={[{ id: `${id}-token` }]}
      backgroundColor="#ffccbc"
      borderColor="#d84315"
    >
      <label style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        Auth Type:
        <select value={authType} onChange={handleTypeChange} style={{ fontSize: '11px', padding: '2px' }}>
          <option value="API Key">API Key</option>
          <option value="OAuth 2.0">OAuth 2.0</option>
          <option value="Bearer Token">Bearer Token</option>
          <option value="Basic Auth">Basic Auth</option>
        </select>
      </label>
      <label style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {authType === 'API Key' ? 'API Key:' : authType === 'Bearer Token' ? 'Token:' : 'Credentials:'}
        <input 
          type="password" 
          value={apiKey} 
          onChange={handleKeyChange}
          style={{ fontSize: '11px', padding: '2px' }}
          placeholder={authType === 'API Key' ? 'Enter API key' : 'Enter credentials'}
        />
      </label>
    </BaseNode>
  );
}
