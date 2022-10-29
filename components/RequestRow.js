import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class RequestRow extends Component {
    state = {
        errorMessage: '',
        loading: false,
    };

    onApprove = async () => {
        this.setState({ loading: true, errorMessage: ''  });
        const campaign = Campaign(this.props.address);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            });
            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch(err) {
            this.setState({ errorMessage: err.message })
        }
        this.setState({ loading: false });
    };

    onFinalize = async () => {
        this.setState({ loading: true, errorMessage: '' });
        try {
            const campaign = Campaign(this.props.address);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.finalizeRequest(this.props.id).send({
                from: accounts[0]
            });
            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch(err) {
            this.setState({ errorMessage: err.message })
        }
        this.setState({ loading: false });
    };


    render() {
        const { Row, Cell } = Table;
        const { id, request } = this.props;
        const renderAuthButton = () => {
            if (!request.hasApproved) {
                return <p>Unapproved</p>;
            } else if (!request.complete) {
                return <p>Has not Finalised</p>;
            }
            else {
                return <p>Completed</p>;
            }
        };
        return (
            <Row
                disabled={request.complete}
                positive={request.hasApproved && !request.complete}
                >
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>
                {renderAuthButton()}
                </Cell>
                <Cell>
                    {request.hasApproved ? null : (
                        <Button inverted color='green' className='approve' onClick={this.onApprove} loading={this.state.loading}>
                        Approve
                        </Button>
                    )}
                </Cell>
                <Cell>
                    {request.complete ? null : (
                        <Button inverted color='blue' className='finalize' onClick={this.onFinalize} loading={this.state.loading}>
                        Finalize
                        </Button>
                    )}
                </Cell>
            </Row>
        );
    }
}

export default RequestRow;