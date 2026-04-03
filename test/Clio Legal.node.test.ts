/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ClioLegal } from '../nodes/Clio Legal/Clio Legal.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('ClioLegal Node', () => {
  let node: ClioLegal;

  beforeAll(() => {
    node = new ClioLegal();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('Clio Legal');
      expect(node.description.name).toBe('cliolegal');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 7 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(7);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(7);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('Matter Resource', () => {
  let mockExecuteFunctions: any;
  
  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        accessToken: 'test-token',
        baseUrl: 'https://app.clio.com'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
      },
    };
  });
  
  it('should get all matters successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getAll')
      .mockReturnValueOnce(50)
      .mockReturnValueOnce('')
      .mockReturnValueOnce('');
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      data: [{ id: '1', description: 'Test Matter' }],
      meta: { records: 1 }
    });
    
    const result = await executeMatterOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://app.clio.com/api/v4/matters',
      headers: expect.objectContaining({
        'Authorization': 'Bearer test-token',
        'User-Agent': 'n8n-clio-legal-node'
      }),
      qs: { limit: 50 },
      json: true,
    });
  });
  
  it('should create a matter successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('create')
      .mockReturnValueOnce('client123')
      .mockReturnValueOnce('New Matter')
      .mockReturnValueOnce('Open')
      .mockReturnValueOnce('Corporate Law');
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      data: { id: '123', description: 'New Matter' }
    });
    
    const result = await executeMatterOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://app.clio.com/api/v4/matters',
      headers: expect.objectContaining({
        'Authorization': 'Bearer test-token',
        'User-Agent': 'n8n-clio-legal-node'
      }),
      body: {
        data: {
          client: { id: 'client123' },
          description: 'New Matter',
          status: 'Open',
          practice_area: 'Corporate Law'
        }
      },
      json: true,
    });
  });
  
  it('should handle errors gracefully when continueOnFail is true', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValue('getAll');
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
    
    const result = await executeMatterOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('API Error');
  });
});

describe('Contact Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        accessToken: 'test-token',
        baseUrl: 'https://app.clio.com' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  it('should get all contacts successfully', async () => {
    const mockResponse = { data: [{ id: 1, name: 'Test Contact' }] };
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAll');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(50);
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeContactOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: 'https://app.clio.com/api/v4/contacts'
      })
    );
  });

  it('should get a specific contact successfully', async () => {
    const mockResponse = { data: { id: 1, name: 'Test Contact' } };
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('get');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('123');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeContactOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: 'https://app.clio.com/api/v4/contacts/123'
      })
    );
  });

  it('should create a contact successfully', async () => {
    const mockResponse = { data: { id: 1, name: 'New Contact' } };
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('create');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('New Contact');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('Person');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('test@example.com');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('123-456-7890');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeContactOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: 'https://app.clio.com/api/v4/contacts',
        body: {
          data: {
            name: 'New Contact',
            type: 'Person',
            email: 'test@example.com',
            phone_number: '123-456-7890'
          }
        }
      })
    );
  });

  it('should handle errors properly', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAll');
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    const result = await executeContactOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
  });
});

describe('Time Entry Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-token',
				baseUrl: 'https://app.clio.com',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	describe('create operation', () => {
		it('should create a time entry successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('create')
				.mockReturnValueOnce('matter123')
				.mockReturnValueOnce('user456')
				.mockReturnValueOnce(2.5)
				.mockReturnValueOnce('2023-10-15')
				.mockReturnValueOnce('Legal research');

			const mockResponse = {
				data: {
					id: 'time_entry_789',
					matter: { id: 'matter123' },
					user: { id: 'user456' },
					quantity: 2.5,
					description: 'Legal research',
				},
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeTimeEntryOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toHaveLength(1);
			expect(result[0].json).toEqual(mockResponse);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://app.clio.com/api/v4/time_entries',
				headers: {
					Authorization: 'Bearer test-token',
					'Content-Type': 'application/json',
					'User-Agent': 'n8n-clio-integration',
				},
				body: {
					data: {
						matter: { id: 'matter123' },
						user: { id: 'user456' },
						quantity: 2.5,
						date: '2023-10-15',
						description: 'Legal research',
					},
				},
				json: true,
			});
		});

		it('should handle create operation error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValue('create');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeTimeEntryOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result[0].json.error).toBe('API Error');
		});
	});

	describe('get operation', () => {
		it('should get a time entry successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('get')
				.mockReturnValueOnce('time_entry_123')
				.mockReturnValueOnce('id,description,quantity');

			const mockResponse = {
				data: {
					id: 'time_entry_123',
					description: 'Legal research',
					quantity: 2.5,
				},
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeTimeEntryOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toHaveLength(1);
			expect(result[0].json).toEqual(mockResponse);
		});
	});

	describe('getAll operation', () => {
		it('should get all time entries successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAll')
				.mockReturnValueOnce(50)
				.mockReturnValueOnce('')
				.mockReturnValueOnce('')
				.mockReturnValueOnce('user123')
				.mockReturnValueOnce('matter456');

			const mockResponse = {
				data: [
					{ id: 'time_entry_1', description: 'Research' },
					{ id: 'time_entry_2', description: 'Meeting' },
				],
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeTimeEntryOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toHaveLength(1);
			expect(result[0].json).toEqual(mockResponse);
		});
	});

	describe('update operation', () => {
		it('should update a time entry successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('update')
				.mockReturnValueOnce('time_entry_123')
				.mockReturnValueOnce(3.0)
				.mockReturnValueOnce('Updated description')
				.mockReturnValueOnce('2023-10-16');

			const mockResponse = {
				data: {
					id: 'time_entry_123',
					quantity: 3.0,
					description: 'Updated description',
					date: '2023-10-16',
				},
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeTimeEntryOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toHaveLength(1);
			expect(result[0].json).toEqual(mockResponse);
		});
	});

	describe('delete operation', () => {
		it('should delete a time entry successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('delete')
				.mockReturnValueOnce('time_entry_123');

			const mockResponse = { success: true };

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeTimeEntryOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toHaveLength(1);
			expect(result[0].json).toEqual(mockResponse);
		});
	});
});

describe('Bill Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        accessToken: 'test-token', 
        baseUrl: 'https://app.clio.com' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  test('should get all bills successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getAll')
      .mockReturnValueOnce(50)
      .mockReturnValueOnce('')
      .mockReturnValueOnce('')
      .mockReturnValueOnce('');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      bills: [{ id: '123', amount: 1000 }],
      meta: { records: 1 }
    });

    const result = await executeBillOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.bills).toHaveLength(1);
  });

  test('should get specific bill successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('get')
      .mockReturnValueOnce('123')
      .mockReturnValueOnce('');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      bill: { id: '123', amount: 1000, status: 'draft' }
    });

    const result = await executeBillOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.bill.id).toBe('123');
  });

  test('should create bill successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('create')
      .mockReturnValueOnce('456')
      .mockReturnValueOnce('2024-01-01')
      .mockReturnValueOnce({
        billItem: [
          { description: 'Legal consultation', amount: 500, quantity: 2 }
        ]
      });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      bill: { id: '789', matter: { id: '456' }, amount: 1000 }
    });

    const result = await executeBillOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.bill.id).toBe('789');
  });

  test('should update bill successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('update')
      .mockReturnValueOnce('123')
      .mockReturnValueOnce('2024-02-01')
      .mockReturnValueOnce('Updated description');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      bill: { id: '123', description: 'Updated description' }
    });

    const result = await executeBillOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.bill.description).toBe('Updated description');
  });

  test('should delete bill successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('delete')
      .mockReturnValueOnce('123');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      success: true
    });

    const result = await executeBillOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.success).toBe(true);
  });

  test('should handle API errors properly', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('get');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeBillOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('API Error');
  });
});

describe('Document Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        accessToken: 'test-token', 
        baseUrl: 'https://app.clio.com'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  describe('getAll operation', () => {
    it('should get all documents successfully', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'getAll';
          case 'limit': return 50;
          default: return '';
        }
      });

      const mockResponse = {
        data: [
          { id: '1', name: 'Document 1' },
          { id: '2', name: 'Document 2' }
        ]
      };

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeDocumentOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });

    it('should handle getAll errors', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'getAll';
        return '';
      });

      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

      await expect(executeDocumentOperations.call(mockExecuteFunctions, [{ json: {} }]))
        .rejects.toThrow('API Error');
    });
  });

  describe('get operation', () => {
    it('should get a specific document successfully', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'get';
          case 'documentId': return '123';
          default: return '';
        }
      });

      const mockResponse = { data: { id: '123', name: 'Test Document' } };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeDocumentOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });
  });

  describe('create operation', () => {
    it('should create a document successfully', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'create';
          case 'matterId': return 'matter123';
          case 'name': return 'New Document';
          case 'file': return 'file-content';
          default: return '';
        }
      });

      const mockResponse = { data: { id: '456', name: 'New Document' } };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeDocumentOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });
  });

  describe('update operation', () => {
    it('should update a document successfully', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'update';
          case 'documentId': return '123';
          case 'name': return 'Updated Document';
          default: return '';
        }
      });

      const mockResponse = { data: { id: '123', name: 'Updated Document' } };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeDocumentOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });
  });

  describe('delete operation', () => {
    it('should delete a document successfully', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'delete';
          case 'documentId': return '123';
          default: return '';
        }
      });

      const mockResponse = { success: true };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeDocumentOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });
  });
});

describe('Activity Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-token',
				baseUrl: 'https://app.clio.com',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	describe('getAll operation', () => {
		it('should get all activities successfully', async () => {
			const mockResponse = {
				data: [
					{ id: 1, type: 'task', description: 'Review contract' },
					{ id: 2, type: 'meeting', description: 'Client consultation' },
				],
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAll')
				.mockReturnValueOnce(50)
				.mockReturnValueOnce('')
				.mockReturnValueOnce('')
				.mockReturnValueOnce('');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeActivityOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});

		it('should handle getAll operation error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValue('getAll');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeActivityOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: { error: 'API Error' },
					pairedItem: { item: 0 },
				},
			]);
		});
	});

	describe('get operation', () => {
		it('should get a specific activity successfully', async () => {
			const mockResponse = {
				data: { id: 1, type: 'task', description: 'Review contract' },
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('get')
				.mockReturnValueOnce('1')
				.mockReturnValueOnce('');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeActivityOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});
	});

	describe('create operation', () => {
		it('should create an activity successfully', async () => {
			const mockResponse = {
				data: { id: 1, type: 'task', description: 'Review contract' },
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('create')
				.mockReturnValueOnce('123')
				.mockReturnValueOnce('task')
				.mockReturnValueOnce('Review contract')
				.mockReturnValueOnce('2023-12-31T23:59:59Z');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeActivityOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});
	});

	describe('update operation', () => {
		it('should update an activity successfully', async () => {
			const mockResponse = {
				data: { id: 1, type: 'task', description: 'Updated contract review' },
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('update')
				.mockReturnValueOnce('1')
				.mockReturnValueOnce('Updated contract review')
				.mockReturnValueOnce('2023-12-31T23:59:59Z')
				.mockReturnValueOnce('completed');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeActivityOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});
	});

	describe('delete operation', () => {
		it('should delete an activity successfully', async () => {
			const mockResponse = { success: true };

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('delete')
				.mockReturnValueOnce('1');

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeActivityOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});
	});
});

describe('User Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-token',
				baseUrl: 'https://app.clio.com',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	it('should get all users successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAll');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(50);
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ users: [] });

		const result = await executeUserOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: { users: [] }, pairedItem: { item: 0 } }]);
	});

	it('should handle get all users error', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAll');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(50);
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('');
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);

		const result = await executeUserOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
	});

	it('should get a specific user successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('get');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('123');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ user: { id: '123' } });

		const result = await executeUserOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: { user: { id: '123' } }, pairedItem: { item: 0 } }]);
	});

	it('should create a user successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('create');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('John Doe');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('john@example.com');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('admin');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ user: { id: '123' } });

		const result = await executeUserOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: { user: { id: '123' } }, pairedItem: { item: 0 } }]);
	});

	it('should update a user successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('update');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('123');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('Jane Doe');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('jane@example.com');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('user');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ user: { id: '123' } });

		const result = await executeUserOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: { user: { id: '123' } }, pairedItem: { item: 0 } }]);
	});

	it('should delete a user successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('delete');
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('123');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ success: true });

		const result = await executeUserOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: { success: true }, pairedItem: { item: 0 } }]);
	});
});
});
