import { Component, React } from 'react';
import { Card, Button, Container, Segment, Grid } from 'semantic-ui-react'
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component{

    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Segment className='grider'>
                    <Grid>
                        <Grid.Column textAlign="center">
                            <Link route={`/campaigns/${address}`} className='router'>
                                <a>
                                <Button inverted color='green' className='view'>View Campaign</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid>
                    </Segment>
                ),
                fluid: true
            };
        });
        return <Card.Group
         items={items} />;
    }

    render() {
        return (
        <Layout>
            <Segment className='grider2'>
                <Grid className='grider2' style={{marginBottom:'10px'}}>
                    <Grid.Column>
                    <h3 style={{marginTop:'10px'}}>Open Campaigns</h3>
                    <Link route="/campaigns/new">
                        <a>
                            <Button inverted className='create' floated='right' content='Create Campaign' icon='add'/>
                        </a>
                    </Link>
                    </Grid.Column>
                </Grid>
                {this.renderCampaigns()}
            </Segment>
        </Layout>
        );
    };
}
export default CampaignIndex; 


