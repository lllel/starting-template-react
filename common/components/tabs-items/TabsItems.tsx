import * as React from 'react';
import * as _ from 'lodash';

//import 'react-tabs/style/react-tabs.scss';
import './styles_external/TabsItemsExternal.scss';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {IComponentProps} from '../../interfaces/components/IComponentProps';

interface IProps extends IComponentProps {
    title?: string;
}

interface IState {
}

export class TabsItems extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Tabs forceRenderTabPanel={true}>
                <TabList>
                    {this.renderTabList(this.props.children)}
                </TabList>

                {this.renderTabPanel(this.props.children)}
            </Tabs>
        )
    }

    renderTabList(children) {
        if (!_.isArray(children)) {
            children = [children];
        }

        return _.map(children, (item, index) => {
            return <Tab key={index}>{item.props.title}</Tab>
        })
    }

    renderTabPanel(children) {
        if (!_.isArray(children)) {
            children = [children];
        }

        return _.map(children, (item, index) => {
            return <TabPanel key={index}><div>{item.props.children}</div></TabPanel>
        })
    }
}

interface IPropsTabsItem {
    title?: string;
}

interface IStateTabsItem {
}

export class TabsItem extends React.Component<IPropsTabsItem, IStateTabsItem> {
}
