# n8n-nodes-clio-legal

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

This n8n community node provides comprehensive integration with Clio Legal practice management software. With 7 resources and extensive operations, it enables automated case management, billing workflows, document handling, time tracking, and client relationship management for legal professionals.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Legal Practice Management](https://img.shields.io/badge/Legal-Practice%20Management-green)
![Time Tracking](https://img.shields.io/badge/Time-Tracking-orange)
![Billing Automation](https://img.shields.io/badge/Billing-Automation-purple)

## Features

- **Matter Management** - Create, update, retrieve and manage legal matters with full case details
- **Client & Contact Management** - Comprehensive contact operations for clients, opposing parties, and referral sources
- **Time Entry & Billing** - Automated time tracking, entry management, and bill generation workflows
- **Document Management** - Upload, organize, and manage legal documents with metadata and version control
- **Activity Tracking** - Monitor case activities, deadlines, appointments, and important events
- **User Administration** - Manage firm users, permissions, and access controls
- **Real-time Synchronization** - Keep n8n workflows synchronized with Clio data in real-time
- **Batch Operations** - Efficient bulk processing for large-scale legal data management

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-clio-legal`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-clio-legal
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-clio-legal.git
cd n8n-nodes-clio-legal
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-clio-legal
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your Clio API key obtained from Clio settings | Yes |
| Base URL | Your Clio instance URL (e.g., app.clio.com) | Yes |
| Environment | Production or Sandbox environment | Yes |

## Resources & Operations

### 1. Matter

| Operation | Description |
|-----------|-------------|
| Create | Create a new legal matter with client and case details |
| Get | Retrieve a specific matter by ID |
| Get All | List all matters with filtering and pagination |
| Update | Update matter information, status, or assignments |
| Delete | Remove a matter from the system |

### 2. Contact

| Operation | Description |
|-----------|-------------|
| Create | Add new contacts (clients, opposing parties, referrals) |
| Get | Retrieve contact details by ID |
| Get All | List all contacts with search and filtering |
| Update | Modify contact information and relationships |
| Delete | Remove contacts from the system |

### 3. Time Entry

| Operation | Description |
|-----------|-------------|
| Create | Log time entries for matters and activities |
| Get | Retrieve specific time entry details |
| Get All | List time entries with date ranges and filters |
| Update | Modify time entry details, rates, or descriptions |
| Delete | Remove time entries |

### 4. Bill

| Operation | Description |
|-----------|-------------|
| Create | Generate bills from time entries and expenses |
| Get | Retrieve bill details and status |
| Get All | List all bills with filtering options |
| Update | Modify billing information or status |
| Send | Send bills to clients via email |

### 5. Document

| Operation | Description |
|-----------|-------------|
| Upload | Upload documents to matters or contacts |
| Get | Retrieve document metadata and download links |
| Get All | List documents with search and filtering |
| Update | Modify document properties and metadata |
| Delete | Remove documents from the system |

### 6. Activity

| Operation | Description |
|-----------|-------------|
| Create | Create calendar events, tasks, and deadlines |
| Get | Retrieve activity details and participants |
| Get All | List activities with date filtering |
| Update | Modify activity details, dates, or assignments |
| Delete | Remove activities from calendars |

### 7. User

| Operation | Description |
|-----------|-------------|
| Get | Retrieve user profile and permissions |
| Get All | List all firm users and their roles |
| Update | Modify user permissions and settings |

## Usage Examples

```javascript
// Create a new matter
{
  "description": "Personal injury case for client John Doe",
  "client_id": 12345,
  "practice_area": "Personal Injury",
  "status": "Open",
  "billable": true,
  "statute_of_limitations": "2025-12-31"
}
```

```javascript
// Log billable time entry
{
  "matter_id": 67890,
  "user_id": 123,
  "date": "2024-01-15",
  "hours": 2.5,
  "description": "Client consultation and case review",
  "activity_type": "Meeting",
  "billable": true,
  "rate": 350.00
}
```

```javascript
// Create client contact
{
  "type": "Person",
  "name": "Jane Smith",
  "email": "jane.smith@email.com",
  "phone": "+1-555-123-4567",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001"
  }
}
```

```javascript
// Generate invoice
{
  "matter_id": 67890,
  "bill_date": "2024-01-31",
  "due_date": "2024-02-29",
  "include_time_entries": true,
  "include_expenses": true,
  "send_to_client": true
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| 401 Unauthorized | Invalid API key or expired credentials | Verify API key in Clio settings and update credentials |
| 403 Forbidden | Insufficient permissions for operation | Check user permissions and role assignments in Clio |
| 404 Not Found | Resource ID does not exist | Verify the matter, contact, or document ID exists |
| 422 Unprocessable Entity | Invalid data format or missing required fields | Review required fields and data validation rules |
| 429 Rate Limited | API rate limit exceeded | Implement delays between requests or reduce frequency |
| 500 Internal Server Error | Clio server error | Retry the request or contact Clio support |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-clio-legal/issues)
- **Clio API Documentation**: [developers.clio.com](https://developers.clio.com)
- **Legal Tech Community**: [Clio Developer Forums](https://community.clio.com)