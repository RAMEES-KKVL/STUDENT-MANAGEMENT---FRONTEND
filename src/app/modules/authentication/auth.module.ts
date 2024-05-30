import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignupBody } from "./pages/signup/signup.component";
import { AuthHeaderComponent } from "./components/auth-header/auth-header.component";
import { AuthSubmitButtonComponent } from "./components/auth-submit-button/auth-submitButton.component";
import { MatInputModule } from "@angular/material/input";
import { LoginBody } from "./pages/login/login.component";

const routes: Routes = [
    {
        path: "signup",
        component : SignupBody
    },
    {
        path : "login",
        component : LoginBody
    }
]

@NgModule({
    declarations: [
        SignupBody,
        AuthHeaderComponent,
        AuthSubmitButtonComponent,
        LoginBody
    ],
    imports: [
        RouterModule.forChild(routes),
        MatInputModule
    ]
})
export class AuthModule {}