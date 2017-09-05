import React, {PropTypes} from 'react';
/*
import {
	Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle,
	List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
	LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput
} from 'framework7-react';
*/
import {Framework7App, Pages, Page, View, Views} from 'framework7-react';

import {routes} from '../routes';

const MainViews = (props, context) => {
  var contacts = [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe"
    }, {
      id: 2,
      first_name: "Jane",
      last_name: "Doe"
    }
  ];
  let header = {
    id: "ID",
    first_name: "First Name",
    last_name: "Last Name"
  };
  let HeaderRow = function(row) {
    return (
      <tr key={row.id}>
        <th className="label-cell">{row.id}</th>
        <th className="label-cell">{row.first_name}</th>
        <th className="tablet-only">{row.last_name}</th>
      </tr>
    );
  };
  let DataRow = function(row) {
    return (
      <tr key={row.id}>
        <td className="label-cell">{row.id}</td>
        <td className="label-cell">{row.first_name}</td>
        <td className="tablet-only">{row.last_name}</td>
      </tr>
    );
  };
  let dataRows = contacts.map(DataRow);
  return (
    <Views>
      <View id="main-view" main url="/">
        {/* Navbar */}
        {/* Pages */}
        <Pages>
          <Page>
            <div className="data-table">
              <table>
                <thead>
                  {HeaderRow(header)}
                </thead>
                <tbody>
                  {dataRows}
                </tbody>
              </table>
            </div>
          </Page>
        </Pages>
      </View>
    </Views>
  );
};

MainViews.contextTypes = {
  framework7AppContext: PropTypes.object
};

//Change themeType to "material" to use the Material theme
export const App = () => (
  <Framework7App themeType="ios" routes={routes}>
    <MainViews/>
  </Framework7App>
);
