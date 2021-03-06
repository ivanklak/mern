import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import LinksPage from "./pages/LinksPage";
import AuthPage from "./pages/AuthPage";
import DetailsPage from "./pages/DetailsPage";
import CreatePage from "./pages/CreatePage";

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/links" exact component={LinksPage}/>
                <Route path="/create" exact component={CreatePage}/>
                <Route path="/details/:id" component={DetailsPage}/>
                <Redirect to="/create"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact component={AuthPage}/>
            <Redirect to='/'/>
        </Switch>
    )
}