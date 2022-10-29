import React, {Component} from 'react';
import { Card, Grid, Button, Segment } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3  from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from "../../routes";

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getCampaignDetails().call();

        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            coa: summary[3]
        };
    }

    renderCards() {
        const {
            balance,
            coa,
            minimumContribution,
            requestsCount,
        } = this.props;

        const items = [
            {
              header: coa,
              description:
                'Manager that has created this campaign',
              meta: 'Address of Control Authority',
              style: { overflowWrap: 'break-word' }
            },
            {
              header: minimumContribution,
              description:
                'You have to contribute at least this much wei to create a request.',
              meta: 'Minimun Contribution in wei',
            },
            {
              header: requestsCount,
              description:
                'A request that has been made from the contract but has to be approved by CoA.',
              meta: 'Number of Requests',
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                description:
                  'How much money this campaign has raised.',
                meta: 'Campaign Balance in ether',
            },
          ];
          
          return <Card.Group items={items} />
    }

    render() {
        return (
        <Layout>
          <Segment className='grider2'>
            <h3>Campaign Show</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Link route={ `/campaigns/${this.props.address}/requests` }>
                                <a>
                                    <Button inverted color='green' className='new'>View Requests</Button>
                                </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
          </Segment>
        </Layout>
        )
    } 
}

export default CampaignShow;