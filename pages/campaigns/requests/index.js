import React, {Component} from 'react';
import { Button, Segment, Table } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount))
            .fill()
            .map(( element, index ) => {
                return campaign.methods.requests(index).call();
            })
        );
        return { address, requests, requestCount };
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return (
                <RequestRow
                    key={index}
                    id={index}
                    request={request}
                    address={this.props.address}
                />
            );
        });
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <Segment className='grider2'>
                    <h3 style={{marginTop:'10px'}}>Request List</h3>
                    <Link route={`/campaigns/${this.props.address}/requests/new`}>
                        <a>
                            <Button inverted color='green' className='new' floated='right'>Add Request</Button>
                        </a>
                    </Link>
                    <Table style={{marginTop:'30px'}}>
                        <Header>
                            <Row>
                                <HeaderCell>ID</HeaderCell>
                                <HeaderCell>Description</HeaderCell>
                                <HeaderCell>Recipient</HeaderCell>
                                <HeaderCell>Status</HeaderCell>
                                <HeaderCell>Approve</HeaderCell>
                                <HeaderCell>Finalize</HeaderCell>
                            </Row>
                        </Header>
                        <Body>{this.renderRows()}</Body>
                    </Table>
                    <div style={{marginTop:'20px'}}>Found {this.props.requestCount} requests.</div>
                </Segment>
            </Layout>
        );
    }
}

export default RequestIndex;
