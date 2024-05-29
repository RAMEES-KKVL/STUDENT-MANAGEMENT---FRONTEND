import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignupBody } from "./pages/signup/signup.component";
import { AuthHeaderComponent } from "./components/auth-header/auth-header.component";
import { AuthSubmitButtonComponent } from "./components/auth-submit-button/auth-submitButton.component";

const routes: Routes = [
    {
        path: "signup",
        component : SignupBody
    }
]

@NgModule({
    declarations: [
        SignupBody,
        AuthHeaderComponent,
        AuthSubmitButtonComponent
    ],
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class AuthModule {}