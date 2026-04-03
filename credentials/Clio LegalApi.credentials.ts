import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class ClioLegalApi implements ICredentialType {
	name = 'clioLegalApi';
	displayName = 'Clio Legal API';
	documentationUrl = 'https://app.clio.com/api/v4/documentation';
	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'authorizationCode',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: 'https://app.clio.com/oauth/authorize',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://app.clio.com/oauth/token',
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'string',
			default: 'read write',
			description: 'Space-separated list of scopes. Available: read, write, admin.',
		},
		{
			displayName: 'API Base URL',
			name: 'apiBaseUrl',
			type: 'string',
			default: 'https://app.clio.com/api/v4',
			required: true,
			description: 'Base URL for Clio API requests',
		},
	];
}