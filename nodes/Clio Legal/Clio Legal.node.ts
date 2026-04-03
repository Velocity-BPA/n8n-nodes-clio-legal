/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-cliolegal/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class ClioLegal implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Clio Legal',
    name: 'cliolegal',
    icon: 'file:cliolegal.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Clio Legal API',
    defaults: {
      name: 'Clio Legal',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'cliolegalApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Matter',
            value: 'matter',
          },
          {
            name: 'Contact',
            value: 'contact',
          },
          {
            name: 'Time Entry',
            value: 'timeEntry',
          },
          {
            name: 'Bill',
            value: 'bill',
          },
          {
            name: 'Document',
            value: 'document',
          },
          {
            name: 'Activity',
            value: 'activity',
          },
          {
            name: 'User',
            value: 'user',
          }
        ],
        default: 'matter',
      },
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['matter'] } },
  options: [
    { name: 'Get All', value: 'getAll', description: 'List all matters', action: 'Get all matters' },
    { name: 'Get', value: 'get', description: 'Get a specific matter', action: 'Get a matter' },
    { name: 'Create', value: 'create', description: 'Create a new matter', action: 'Create a matter' },
    { name: 'Update', value: 'update', description: 'Update a matter', action: 'Update a matter' },
    { name: 'Delete', value: 'delete', description: 'Delete a matter', action: 'Delete a matter' },
  ],
  default: 'getAll',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['contact'] } },
  options: [
    { name: 'Get All', value: 'getAll', description: 'List all contacts', action: 'Get all contacts' },
    { name: 'Get', value: 'get', description: 'Get a specific contact', action: 'Get a contact' },
    { name: 'Create', value: 'create', description: 'Create a new contact', action: 'Create a contact' },
    { name: 'Update', value: 'update', description: 'Update a contact', action: 'Update a contact' },
    { name: 'Delete', value: 'delete', description: 'Delete a contact', action: 'Delete a contact' }
  ],
  default: 'getAll',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['timeEntry'],
		},
	},
	options: [
		{
			name: 'Create',
			value: 'create',
			description: 'Create a new time entry',
			action: 'Create a time entry',
		},
		{
			name: 'Delete',
			value: 'delete',
			description: 'Delete a time entry',
			action: 'Delete a time entry',
		},
		{
			name: 'Get',
			value: 'get',
			description: 'Get a specific time entry',
			action: 'Get a time entry',
		},
		{
			name: 'Get All',
			value: 'getAll',
			description: 'List all time entries',
			action: 'Get all time entries',
		},
		{
			name: 'Update',
			value: 'update',
			description: 'Update a time entry',
			action: 'Update a time entry',
		},
	],
	default: 'getAll',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['bill'] } },
  options: [
    { name: 'Get All', value: 'getAll', description: 'List all bills', action: 'Get all bills' },
    { name: 'Get', value: 'get', description: 'Get a specific bill', action: 'Get a bill' },
    { name: 'Create', value: 'create', description: 'Create a new bill', action: 'Create a bill' },
    { name: 'Update', value: 'update', description: 'Update a bill', action: 'Update a bill' },
    { name: 'Delete', value: 'delete', description: 'Delete a bill', action: 'Delete a bill' },
  ],
  default: 'getAll',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['document'] } },
  options: [
    { name: 'Get All', value: 'getAll', description: 'List all documents', action: 'Get all documents' },
    { name: 'Get', value: 'get', description: 'Get a specific document', action: 'Get a document' },
    { name: 'Create', value: 'create', description: 'Upload a new document', action: 'Create a document' },
    { name: 'Update', value: 'update', description: 'Update document metadata', action: 'Update a document' },
    { name: 'Delete', value: 'delete', description: 'Delete a document', action: 'Delete a document' },
  ],
  default: 'getAll',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['activity'] } },
	options: [
		{
			name: 'Create',
			value: 'create',
			description: 'Create a new activity',
			action: 'Create an activity',
		},
		{
			name: 'Delete',
			value: 'delete',
			description: 'Delete an activity',
			action: 'Delete an activity',
		},
		{
			name: 'Get',
			value: 'get',
			description: 'Get a specific activity',
			action: 'Get an activity',
		},
		{
			name: 'Get All',
			value: 'getAll',
			description: 'List all activities',
			action: 'Get all activities',
		},
		{
			name: 'Update',
			value: 'update',
			description: 'Update an activity',
			action: 'Update an activity',
		},
	],
	default: 'getAll',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['user'],
		},
	},
	options: [
		{
			name: 'Get All',
			value: 'getAll',
			description: 'List all users',
			action: 'Get all users',
		},
		{
			name: 'Get',
			value: 'get',
			description: 'Get a specific user',
			action: 'Get a user',
		},
		{
			name: 'Create',
			value: 'create',
			description: 'Create a new user',
			action: 'Create a user',
		},
		{
			name: 'Update',
			value: 'update',
			description: 'Update user information',
			action: 'Update a user',
		},
		{
			name: 'Delete',
			value: 'delete',
			description: 'Delete a user',
			action: 'Delete a user',
		},
	],
	default: 'getAll',
},
{
  displayName: 'Matter ID',
  name: 'matterId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['matter'], operation: ['get', 'update', 'delete'] } },
  default: '',
  description: 'The ID of the matter to get, update, or delete',
},
{
  displayName: 'Client ID',
  name: 'clientId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['matter'], operation: ['create'] } },
  default: '',
  description: 'The ID of the client for this matter',
},
{
  displayName: 'Description',
  name: 'description',
  type: 'string',
  displayOptions: { show: { resource: ['matter'], operation: ['create', 'update'] } },
  default: '',
  description: 'Description of the matter',
},
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  options: [
    { name: 'Open', value: 'Open' },
    { name: 'Closed', value: 'Closed' },
    { name: 'Pending', value: 'Pending' },
  ],
  displayOptions: { show: { resource: ['matter'], operation: ['create', 'update'] } },
  default: 'Open',
  description: 'Status of the matter',
},
{
  displayName: 'Practice Area',
  name: 'practiceArea',
  type: 'string',
  displayOptions: { show: { resource: ['matter'], operation: ['create', 'update'] } },
  default: '',
  description: 'Practice area for this matter',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: { show: { resource: ['matter'], operation: ['getAll'] } },
  default: 50,
  description: 'Maximum number of results to return',
  typeOptions: { minValue: 1, maxValue: 200 },
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  displayOptions: { show: { resource: ['matter'], operation: ['getAll'] } },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Fields',
  name: 'fields',
  type: 'string',
  displayOptions: { show: { resource: ['matter'], operation: ['getAll', 'get'] } },
  default: '',
  description: 'Comma-separated list of fields to include in the response',
},
{
  displayName: 'Contact ID',
  name: 'contactId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['contact'], operation: ['get', 'update', 'delete'] } },
  default: '',
  description: 'The ID of the contact'
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: { show: { resource: ['contact'], operation: ['getAll'] } },
  default: 50,
  description: 'Maximum number of contacts to return'
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  displayOptions: { show: { resource: ['contact'], operation: ['getAll'] } },
  default: '',
  description: 'Cursor for pagination'
},
{
  displayName: 'Fields',
  name: 'fields',
  type: 'string',
  displayOptions: { show: { resource: ['contact'], operation: ['getAll', 'get'] } },
  default: '',
  description: 'Comma-separated list of fields to include in the response'
},
{
  displayName: 'Type',
  name: 'type',
  type: 'options',
  displayOptions: { show: { resource: ['contact'], operation: ['getAll', 'create'] } },
  options: [
    { name: 'Person', value: 'Person' },
    { name: 'Company', value: 'Company' }
  ],
  default: 'Person',
  description: 'The type of contact to filter by or create'
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['contact'], operation: ['create'] } },
  default: '',
  description: 'The name of the contact'
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  displayOptions: { show: { resource: ['contact'], operation: ['update'] } },
  default: '',
  description: 'The name of the contact'
},
{
  displayName: 'Email',
  name: 'email',
  type: 'string',
  displayOptions: { show: { resource: ['contact'], operation: ['create', 'update'] } },
  default: '',
  description: 'The email address of the contact'
},
{
  displayName: 'Phone',
  name: 'phone',
  type: 'string',
  displayOptions: { show: { resource: ['contact'], operation: ['create', 'update'] } },
  default: '',
  description: 'The phone number of the contact'
},
{
	displayName: 'Time Entry ID',
	name: 'timeEntryId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['timeEntry'],
			operation: ['get', 'update', 'delete'],
		},
	},
	default: '',
	description: 'The ID of the time entry',
},
{
	displayName: 'Matter ID',
	name: 'matterId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['timeEntry'],
			operation: ['create'],
		},
	},
	default: '',
	description: 'The ID of the matter this time entry belongs to',
},
{
	displayName: 'User ID',
	name: 'userId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['timeEntry'],
			operation: ['create'],
		},
	},
	default: '',
	description: 'The ID of the user who performed the work',
},
{
	displayName: 'Quantity',
	name: 'quantity',
	type: 'number',
	required: true,
	displayOptions: {
		show: {
			resource: ['timeEntry'],
			operation: ['create', 'update'],
		},
	},
	default: 0,
	description: 'Time quantity in hours (decimal format, e.g., 1.5 for 1 hour 30 minutes)',
},
{
	displayName: 'Date',
	name: 'date',
	type: 'dateTime',
	required: true,
	displayOptions: {
		show: {
			resource: ['timeEntry'],
			operation: ['create'],
		},
	},
	default: '',
	description: 'Date when the work was performed',
},
{
	displayName: 'Date',
	name: 'date',
	type: 'dateTime',
	required: false,
	displayOptions: {
		show: {
			resource: ['timeEntry'],
			operation: ['update'],
		},
	},
	default: '',
	description: 'Date when the work was performed',
},
{
	displayName: 'Description',
	name: 'description',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['timeEntry'],
			operation: ['create'],
		},
	},
	default: '',
	description: 'Description of the work performed',
},
{
	displayName: 'Description',
	name: 'description',
	type: 'string',
	required: false,
	displayOptions: {
		show: {
			resource: ['timeEntry'],
			operation: ['update'],
		},
	},
	default: '',
	description: 'Description of the work performed',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['timeEntry'],
			operation: ['getAll'],
		},
	},
	default: 50,
	description: 'Maximum number of time entries to return',
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['timeEntry'],
			operation: ['getAll'],
		},
	},
	default: '',
	description: 'Pagination cursor for retrieving the next set of results',
},
{
	displayName: 'Fields',
	name: 'fields',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['timeEntry'],
			operation: ['get', 'getAll'],
		},
	},
	default: '',
	description: 'Comma-separated list of fields to return',
},
{
	displayName: 'Filter by User ID',
	name: 'filterUserId',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['timeEntry'],
			operation: ['getAll'],
		},
	},
	default: '',
	description: 'Filter time entries by user ID',
},
{
	displayName: 'Filter by Matter ID',
	name: 'filterMatterId',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['timeEntry'],
			operation: ['getAll'],
		},
	},
	default: '',
	description: 'Filter time entries by matter ID',
},
{
  displayName: 'Bill ID',
  name: 'billId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['bill'], operation: ['get', 'update', 'delete'] } },
  default: '',
  placeholder: '12345',
  description: 'The ID of the bill',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: { show: { resource: ['bill'], operation: ['getAll'] } },
  default: 50,
  description: 'Maximum number of bills to return',
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  displayOptions: { show: { resource: ['bill'], operation: ['getAll'] } },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Fields',
  name: 'fields',
  type: 'string',
  displayOptions: { show: { resource: ['bill'], operation: ['getAll', 'get'] } },
  default: '',
  description: 'Comma-separated list of fields to return',
},
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  displayOptions: { show: { resource: ['bill'], operation: ['getAll'] } },
  options: [
    { name: 'Draft', value: 'draft' },
    { name: 'Pending', value: 'pending' },
    { name: 'Sent', value: 'sent' },
    { name: 'Paid', value: 'paid' },
    { name: 'Overdue', value: 'overdue' },
  ],
  default: '',
  description: 'Filter bills by status',
},
{
  displayName: 'Matter ID',
  name: 'matterId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['bill'], operation: ['create'] } },
  default: '',
  placeholder: '12345',
  description: 'The ID of the matter to bill',
},
{
  displayName: 'Due Date',
  name: 'dueDate',
  type: 'dateTime',
  displayOptions: { show: { resource: ['bill'], operation: ['create', 'update'] } },
  default: '',
  description: 'The due date for the bill',
},
{
  displayName: 'Description',
  name: 'description',
  type: 'string',
  displayOptions: { show: { resource: ['bill'], operation: ['update'] } },
  default: '',
  description: 'Description of the bill',
},
{
  displayName: 'Bill Items',
  name: 'billItems',
  placeholder: 'Add Bill Item',
  type: 'fixedCollection',
  typeOptions: { multipleValues: true },
  displayOptions: { show: { resource: ['bill'], operation: ['create'] } },
  default: {},
  options: [
    {
      name: 'billItem',
      displayName: 'Bill Item',
      values: [
        {
          displayName: 'Description',
          name: 'description',
          type: 'string',
          default: '',
          description: 'Description of the bill item',
        },
        {
          displayName: 'Amount',
          name: 'amount',
          type: 'number',
          default: 0,
          description: 'Amount for the bill item',
        },
        {
          displayName: 'Quantity',
          name: 'quantity',
          type: 'number',
          default: 1,
          description: 'Quantity of the bill item',
        },
      ],
    },
  ],
},
{
  displayName: 'Document ID',
  name: 'documentId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['document'], operation: ['get', 'update', 'delete'] } },
  default: '',
  description: 'The ID of the document',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: { show: { resource: ['document'], operation: ['getAll'] } },
  default: 50,
  description: 'Number of documents to return',
},
{
  displayName: 'Cursor',
  name: 'cursor',
  type: 'string',
  displayOptions: { show: { resource: ['document'], operation: ['getAll'] } },
  default: '',
  description: 'Cursor for pagination',
},
{
  displayName: 'Fields',
  name: 'fields',
  type: 'string',
  displayOptions: { show: { resource: ['document'], operation: ['getAll', 'get'] } },
  default: '',
  description: 'Comma-separated list of fields to return',
},
{
  displayName: 'Matter ID',
  name: 'matterId',
  type: 'string',
  displayOptions: { show: { resource: ['document'], operation: ['getAll', 'create'] } },
  default: '',
  description: 'ID of the matter to filter documents by (for getAll) or associate with (for create)',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['document'], operation: ['create'] } },
  default: '',
  description: 'Name of the document',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  displayOptions: { show: { resource: ['document'], operation: ['update'] } },
  default: '',
  description: 'New name of the document',
},
{
  displayName: 'File',
  name: 'file',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['document'], operation: ['create'] } },
  default: '',
  description: 'File content or path to upload',
},
{
  displayName: 'Description',
  name: 'description',
  type: 'string',
  displayOptions: { show: { resource: ['document'], operation: ['create', 'update'] } },
  default: '',
  description: 'Description of the document',
},
{
	displayName: 'Activity ID',
	name: 'activityId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['activity'],
			operation: ['get', 'update', 'delete'],
		},
	},
	default: '',
	description: 'The ID of the activity',
},
{
	displayName: 'Matter ID',
	name: 'matterId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['activity'],
			operation: ['create'],
		},
	},
	default: '',
	description: 'The ID of the matter this activity is related to',
},
{
	displayName: 'Type',
	name: 'type',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['activity'],
			operation: ['create'],
		},
	},
	default: '',
	description: 'The type of the activity',
},
{
	displayName: 'Description',
	name: 'description',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['activity'],
			operation: ['create'],
		},
	},
	default: '',
	description: 'Description of the activity',
},
{
	displayName: 'Due Date',
	name: 'dueDate',
	type: 'dateTime',
	displayOptions: {
		show: {
			resource: ['activity'],
			operation: ['create', 'update'],
		},
	},
	default: '',
	description: 'The due date of the activity',
},
{
	displayName: 'Description',
	name: 'description',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['activity'],
			operation: ['update'],
		},
	},
	default: '',
	description: 'Description of the activity',
},
{
	displayName: 'Status',
	name: 'status',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['activity'],
			operation: ['update'],
		},
	},
	options: [
		{
			name: 'Pending',
			value: 'pending',
		},
		{
			name: 'Completed',
			value: 'completed',
		},
		{
			name: 'Cancelled',
			value: 'cancelled',
		},
	],
	default: 'pending',
	description: 'The status of the activity',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['activity'],
			operation: ['getAll'],
		},
	},
	typeOptions: {
		minValue: 1,
		maxValue: 200,
	},
	default: 50,
	description: 'Maximum number of results to return',
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['activity'],
			operation: ['getAll'],
		},
	},
	default: '',
	description: 'Cursor for pagination',
},
{
	displayName: 'Matter ID',
	name: 'matterId',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['activity'],
			operation: ['getAll'],
		},
	},
	default: '',
	description: 'Filter activities by matter ID',
},
{
	displayName: 'Fields',
	name: 'fields',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['activity'],
			operation: ['get', 'getAll'],
		},
	},
	default: '',
	description: 'Comma-separated list of fields to include in the response',
},
{
	displayName: 'User ID',
	name: 'userId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['get', 'update', 'delete'],
		},
	},
	default: '',
	description: 'The ID of the user',
},
{
	displayName: 'Name',
	name: 'name',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['create'],
		},
	},
	default: '',
	description: 'The name of the user',
},
{
	displayName: 'Name',
	name: 'name',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['update'],
		},
	},
	default: '',
	description: 'The name of the user',
},
{
	displayName: 'Email',
	name: 'email',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['create'],
		},
	},
	default: '',
	description: 'The email address of the user',
},
{
	displayName: 'Email',
	name: 'email',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['update'],
		},
	},
	default: '',
	description: 'The email address of the user',
},
{
	displayName: 'Role',
	name: 'role',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['create'],
		},
	},
	default: '',
	description: 'The role of the user',
},
{
	displayName: 'Role',
	name: 'role',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['update'],
		},
	},
	default: '',
	description: 'The role of the user',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['getAll'],
		},
	},
	default: 50,
	description: 'Maximum number of results to return',
},
{
	displayName: 'Cursor',
	name: 'cursor',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['getAll'],
		},
	},
	default: '',
	description: 'Cursor for pagination',
},
{
	displayName: 'Fields',
	name: 'fields',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['getAll', 'get'],
		},
	},
	default: '',
	description: 'Comma-separated list of fields to include in the response',
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'matter':
        return [await executeMatterOperations.call(this, items)];
      case 'contact':
        return [await executeContactOperations.call(this, items)];
      case 'timeEntry':
        return [await executeTimeEntryOperations.call(this, items)];
      case 'bill':
        return [await executeBillOperations.call(this, items)];
      case 'document':
        return [await executeDocumentOperations.call(this, items)];
      case 'activity':
        return [await executeActivityOperations.call(this, items)];
      case 'user':
        return [await executeUserOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeMatterOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('cliolegalApi') as any;
  
  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      
      switch (operation) {
        case 'getAll': {
          const limit = this.getNodeParameter('limit', i, 50) as number;
          const cursor = this.getNodeParameter('cursor', i, '') as string;
          const fields = this.getNodeParameter('fields', i, '') as string;
          
          const qs: any = { limit };
          if (cursor) qs.cursor = cursor;
          if (fields) qs.fields = fields;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl || 'https://app.clio.com'}/api/v4/matters`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'User-Agent': 'n8n-clio-legal-node',
              'Content-Type': 'application/json',
            },
            qs,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'get': {
          const matterId = this.getNodeParameter('matterId', i) as string;
          const fields = this.getNodeParameter('fields', i, '') as string;
          
          const qs: any = {};
          if (fields) qs.fields = fields;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl || 'https://app.clio.com'}/api/v4/matters/${matterId}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'User-Agent': 'n8n-clio-legal-node',
              'Content-Type': 'application/json',
            },
            qs,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'create': {
          const clientId = this.getNodeParameter('clientId', i) as string;
          const description = this.getNodeParameter('description', i, '') as string;
          const status = this.getNodeParameter('status', i, 'Open') as string;
          const practiceArea = this.getNodeParameter('practiceArea', i, '') as string;
          
          const body: any = {
            data: {
              client: { id: clientId },
              description,
              status,
            },
          };
          
          if (practiceArea) {
            body.data.practice_area = practiceArea;
          }
          
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl || 'https://app.clio.com'}/api/v4/matters`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'User-Agent': 'n8n-clio-legal-node',
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'update': {
          const matterId = this.getNodeParameter('matterId', i) as string;
          const description = this.getNodeParameter('description', i, '') as string;
          const status = this.getNodeParameter('status', i, '') as string;
          const practiceArea = this.getNodeParameter('practiceArea', i, '') as string;
          
          const body: any = { data: {} };
          
          if (description) body.data.description = description;
          if (status) body.data.status = status;
          if (practiceArea) body.data.practice_area = practiceArea;
          
          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl || 'https://app.clio.com'}/api/v4/matters/${matterId}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'User-Agent': 'n8n-clio-legal-node',
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'delete': {
          const matterId = this.getNodeParameter('matterId', i) as string;
          
          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl || 'https://app.clio.com'}/api/v4/matters/${matterId}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'User-Agent': 'n8n-clio-legal-node',
              'Content-Type': 'application/json',
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }
      
      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }
  
  return returnData;
}

async function executeContactOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('cliolegalApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getAll': {
          const limit = this.getNodeParameter('limit', i, 50) as number;
          const cursor = this.getNodeParameter('cursor', i, '') as string;
          const fields = this.getNodeParameter('fields', i, '') as string;
          const type = this.getNodeParameter('type', i, '') as string;

          const qs: any = {};
          if (limit) qs.limit = limit;
          if (cursor) qs.cursor = cursor;
          if (fields) qs.fields = fields;
          if (type) qs.type = type;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/api/v4/contacts`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'User-Agent': 'n8n-clio-integration',
              'Accept': 'application/json'
            },
            qs,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'get': {
          const contactId = this.getNodeParameter('contactId', i) as string;
          const fields = this.getNodeParameter('fields', i, '') as string;

          const qs: any = {};
          if (fields) qs.fields = fields;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/api/v4/contacts/${contactId}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'User-Agent': 'n8n-clio-integration',
              'Accept': 'application/json'
            },
            qs,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'create': {
          const name = this.getNodeParameter('name', i) as string;
          const type = this.getNodeParameter('type', i) as string;
          const email = this.getNodeParameter('email', i, '') as string;
          const phone = this.getNodeParameter('phone', i, '') as string;

          const body: any = {
            data: {
              name,
              type
            }
          };

          if (email) body.data.email = email;
          if (phone) body.data.phone_number = phone;

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/api/v4/contacts`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'User-Agent': 'n8n-clio-integration',
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'update': {
          const contactId = this.getNodeParameter('contactId', i) as string;
          const name = this.getNodeParameter('name', i, '') as string;
          const email = this.getNodeParameter('email', i, '') as string;
          const phone = this.getNodeParameter('phone', i, '') as string;

          const body: any = { data: {} };
          if (name) body.data.name = name;
          if (email) body.data.email = email;
          if (phone) body.data.phone_number = phone;

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/api/v4/contacts/${contactId}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'User-Agent': 'n8n-clio-integration',
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'delete': {
          const contactId = this.getNodeParameter('contactId', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/api/v4/contacts/${contactId}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'User-Agent': 'n8n-clio-integration',
              'Accept': 'application/json'
            },
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeTimeEntryOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('cliolegalApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'create': {
					const matterId = this.getNodeParameter('matterId', i) as string;
					const userId = this.getNodeParameter('userId', i) as string;
					const quantity = this.getNodeParameter('quantity', i) as number;
					const date = this.getNodeParameter('date', i) as string;
					const description = this.getNodeParameter('description', i) as string;

					const body = {
						data: {
							matter: { id: matterId },
							user: { id: userId },
							quantity,
							date,
							description,
						},
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/api/v4/time_entries`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
							'User-Agent': 'n8n-clio-integration',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'delete': {
					const timeEntryId = this.getNodeParameter('timeEntryId', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/api/v4/time_entries/${timeEntryId}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'User-Agent': 'n8n-clio-integration',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'get': {
					const timeEntryId = this.getNodeParameter('timeEntryId', i) as string;
					const fields = this.getNodeParameter('fields', i) as string;

					const qs: any = {};
					if (fields) {
						qs.fields = fields;
					}

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/api/v4/time_entries/${timeEntryId}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'User-Agent': 'n8n-clio-integration',
						},
						qs,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getAll': {
					const limit = this.getNodeParameter('limit', i) as number;
					const cursor = this.getNodeParameter('cursor', i) as string;
					const fields = this.getNodeParameter('fields', i) as string;
					const filterUserId = this.getNodeParameter('filterUserId', i) as string;
					const filterMatterId = this.getNodeParameter('filterMatterId', i) as string;

					const qs: any = {};
					if (limit) {
						qs.limit = limit;
					}
					if (cursor) {
						qs.cursor = cursor;
					}
					if (fields) {
						qs.fields = fields;
					}
					if (filterUserId) {
						qs.user_id = filterUserId;
					}
					if (filterMatterId) {
						qs.matter_id = filterMatterId;
					}

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/api/v4/time_entries`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'User-Agent': 'n8n-clio-integration',
						},
						qs,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'update': {
					const timeEntryId = this.getNodeParameter('timeEntryId', i) as string;
					const quantity = this.getNodeParameter('quantity', i) as number;
					const description = this.getNodeParameter('description', i) as string;
					const date = this.getNodeParameter('date', i) as string;

					const body: any = {
						data: {},
					};

					if (quantity !== undefined) {
						body.data.quantity = quantity;
					}
					if (description) {
						body.data.description = description;
					}
					if (date) {
						body.data.date = date;
					}

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/api/v4/time_entries/${timeEntryId}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
							'User-Agent': 'n8n-clio-integration',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeBillOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('cliolegalApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getAll': {
          const qs: any = {};
          const limit = this.getNodeParameter('limit', i) as number;
          const cursor = this.getNodeParameter('cursor', i) as string;
          const fields = this.getNodeParameter('fields', i) as string;
          const status = this.getNodeParameter('status', i) as string;

          if (limit) qs.limit = limit;
          if (cursor) qs.cursor = cursor;
          if (fields) qs.fields = fields;
          if (status) qs.status = status;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/api/v4/bills`,
            headers: {
              Authorization: `Bearer ${credentials.accessToken}`,
              'User-Agent': 'n8n-clio-legal-node',
            },
            qs,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'get': {
          const billId = this.getNodeParameter('billId', i) as string;
          const fields = this.getNodeParameter('fields', i) as string;
          const qs: any = {};

          if (fields) qs.fields = fields;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/api/v4/bills/${billId}`,
            headers: {
              Authorization: `Bearer ${credentials.accessToken}`,
              'User-Agent': 'n8n-clio-legal-node',
            },
            qs,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'create': {
          const matterId = this.getNodeParameter('matterId', i) as string;
          const dueDate = this.getNodeParameter('dueDate', i) as string;
          const billItems = this.getNodeParameter('billItems', i) as any;

          const body: any = {
            bill: {
              matter: { id: matterId },
            },
          };

          if (dueDate) body.bill.due_date = dueDate;
          if (billItems?.billItem?.length) {
            body.bill.bill_items = billItems.billItem.map((item: any) => ({
              description: item.description,
              amount: item.amount,
              quantity: item.quantity,
            }));
          }

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/api/v4/bills`,
            headers: {
              Authorization: `Bearer ${credentials.accessToken}`,
              'User-Agent': 'n8n-clio-legal-node',
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'update': {
          const billId = this.getNodeParameter('billId', i) as string;
          const dueDate = this.getNodeParameter('dueDate', i) as string;
          const description = this.getNodeParameter('description', i) as string;

          const body: any = {
            bill: {},
          };

          if (dueDate) body.bill.due_date = dueDate;
          if (description) body.bill.description = description;

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/api/v4/bills/${billId}`,
            headers: {
              Authorization: `Bearer ${credentials.accessToken}`,
              'User-Agent': 'n8n-clio-legal-node',
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'delete': {
          const billId = this.getNodeParameter('billId', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/api/v4/bills/${billId}`,
            headers: {
              Authorization: `Bearer ${credentials.accessToken}`,
              'User-Agent': 'n8n-clio-legal-node',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeDocumentOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('cliolegalApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const baseOptions: any = {
        headers: {
          'Authorization': `Bearer ${credentials.accessToken}`,
          'User-Agent': 'n8n-clio-integration',
          'Content-Type': 'application/json',
        },
        json: true,
      };

      switch (operation) {
        case 'getAll': {
          const limit = this.getNodeParameter('limit', i) as number;
          const cursor = this.getNodeParameter('cursor', i) as string;
          const fields = this.getNodeParameter('fields', i) as string;
          const matterId = this.getNodeParameter('matterId', i) as string;

          const queryParams: any = {};
          if (limit) queryParams.limit = limit;
          if (cursor) queryParams.cursor = cursor;
          if (fields) queryParams.fields = fields;
          if (matterId) queryParams.matter_id = matterId;

          const queryString = Object.keys(queryParams).length > 0 
            ? '?' + Object.entries(queryParams).map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`).join('&')
            : '';

          const options = {
            ...baseOptions,
            method: 'GET',
            url: `${credentials.baseUrl}/api/v4/documents${queryString}`,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'get': {
          const documentId = this.getNodeParameter('documentId', i) as string;
          const fields = this.getNodeParameter('fields', i) as string;

          const queryString = fields ? `?fields=${encodeURIComponent(fields)}` : '';

          const options = {
            ...baseOptions,
            method: 'GET',
            url: `${credentials.baseUrl}/api/v4/documents/${documentId}${queryString}`,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'create': {
          const matterId = this.getNodeParameter('matterId', i) as string;
          const name = this.getNodeParameter('name', i) as string;
          const file = this.getNodeParameter('file', i) as string;
          const description = this.getNodeParameter('description', i) as string;

          const body: any = {
            matter_id: matterId,
            name: name,
            file: file,
          };

          if (description) body.description = description;

          const options = {
            ...baseOptions,
            method: 'POST',
            url: `${credentials.baseUrl}/api/v4/documents`,
            body: body,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'update': {
          const documentId = this.getNodeParameter('documentId', i) as string;
          const name = this.getNodeParameter('name', i) as string;
          const description = this.getNodeParameter('description', i) as string;

          const body: any = {};
          if (name) body.name = name;
          if (description) body.description = description;

          const options = {
            ...baseOptions,
            method: 'PUT',
            url: `${credentials.baseUrl}/api/v4/documents/${documentId}`,
            body: body,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'delete': {
          const documentId = this.getNodeParameter('documentId', i) as string;

          const options = {
            ...baseOptions,
            method: 'DELETE',
            url: `${credentials.baseUrl}/api/v4/documents/${documentId}`,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeActivityOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('cliolegalApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAll': {
					const qs: any = {};
					const limit = this.getNodeParameter('limit', i) as number;
					const cursor = this.getNodeParameter('cursor', i) as string;
					const matterId = this.getNodeParameter('matterId', i) as string;
					const fields = this.getNodeParameter('fields', i) as string;

					if (limit) qs.limit = limit;
					if (cursor) qs.cursor = cursor;
					if (matterId) qs.matter_id = matterId;
					if (fields) qs.fields = fields;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/api/v4/activities`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'User-Agent': 'n8n-clio-integration',
							'Content-Type': 'application/json',
						},
						qs,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'get': {
					const activityId = this.getNodeParameter('activityId', i) as string;
					const fields = this.getNodeParameter('fields', i) as string;
					const qs: any = {};

					if (fields) qs.fields = fields;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/api/v4/activities/${activityId}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'User-Agent': 'n8n-clio-integration',
							'Content-Type': 'application/json',
						},
						qs,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'create': {
					const matterId = this.getNodeParameter('matterId', i) as string;
					const type = this.getNodeParameter('type', i) as string;
					const description = this.getNodeParameter('description', i) as string;
					const dueDate = this.getNodeParameter('dueDate', i) as string;

					const body: any = {
						data: {
							matter: {
								id: matterId,
							},
							type,
							description,
						},
					};

					if (dueDate) {
						body.data.due_date = dueDate;
					}

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/api/v4/activities`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'User-Agent': 'n8n-clio-integration',
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'update': {
					const activityId = this.getNodeParameter('activityId', i) as string;
					const description = this.getNodeParameter('description', i) as string;
					const dueDate = this.getNodeParameter('dueDate', i) as string;
					const status = this.getNodeParameter('status', i) as string;

					const body: any = {
						data: {},
					};

					if (description) body.data.description = description;
					if (dueDate) body.data.due_date = dueDate;
					if (status) body.data.status = status;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/api/v4/activities/${activityId}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'User-Agent': 'n8n-clio-integration',
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'delete': {
					const activityId = this.getNodeParameter('activityId', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/api/v4/activities/${activityId}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'User-Agent': 'n8n-clio-integration',
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeUserOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('cliolegalApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAll': {
					const limit = this.getNodeParameter('limit', i) as number;
					const cursor = this.getNodeParameter('cursor', i) as string;
					const fields = this.getNodeParameter('fields', i) as string;

					const qs: any = {};
					if (limit) qs.limit = limit;
					if (cursor) qs.cursor = cursor;
					if (fields) qs.fields = fields;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/api/v4/users`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'User-Agent': 'n8n-clio-integration',
						},
						qs,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'get': {
					const userId = this.getNodeParameter('userId', i) as string;
					const fields = this.getNodeParameter('fields', i) as string;

					const qs: any = {};
					if (fields) qs.fields = fields;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/api/v4/users/${userId}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'User-Agent': 'n8n-clio-integration',
						},
						qs,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'create': {
					const name = this.getNodeParameter('name', i) as string;
					const email = this.getNodeParameter('email', i) as string;
					const role = this.getNodeParameter('role', i) as string;

					const body = {
						data: {
							name,
							email,
							role,
						},
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/api/v4/users`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'User-Agent': 'n8n-clio-integration',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'update': {
					const userId = this.getNodeParameter('userId', i) as string;
					const name = this.getNodeParameter('name', i) as string;
					const email = this.getNodeParameter('email', i) as string;
					const role = this.getNodeParameter('role', i) as string;

					const body: any = { data: {} };
					if (name) body.data.name = name;
					if (email) body.data.email = email;
					if (role) body.data.role = role;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/api/v4/users/${userId}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'User-Agent': 'n8n-clio-integration',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'delete': {
					const userId = this.getNodeParameter('userId', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/api/v4/users/${userId}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'User-Agent': 'n8n-clio-integration',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: {
					item: i,
				},
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: {
						item: i,
					},
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}
