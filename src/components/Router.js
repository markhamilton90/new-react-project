import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PlaylistCreater from './PlaylistCreater';
import App from './App';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={PlaylistCreater}></Route>
            <Route path="/playlist/:playlistId" component={App}></Route>
        </Switch>
    </BrowserRouter>
);

export default Router;
