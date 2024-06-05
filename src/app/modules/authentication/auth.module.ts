import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignupBody } from "./pages/signup/signup.component";
import { AuthHeaderComponent } from "./components/auth-header/auth-header.component";
import { AuthSubmitButtonComponent } from "./components/auth-submit-button/auth-submitButton.component";
import { MatInputModule } from "@angular/material/input";
import { LoginBody } from "./pages/login/login.component";
import { OtpBody } from "./pages/otp/otp.component";
import { FormsModule } from "@angular/forms";
import { SecretKeyBody } from "./pages/admin-secretKey/secretKey.component";

const routes: Routes = [
    {
        path: "signup",
        component : SignupBody
    },
    {
        path : "login",
        component : LoginBody
    },
    {
        path : "otp-verification",
        component : OtpBody
    },
    {
        path : "secret_key-verification",
        component : SecretKeyBody
    }
]

@NgModule({
    declarations: [
        AuthHeaderComponent,
        AuthSubmitButtonComponent,
        SignupBody,
        LoginBody,
        OtpBody,
        SecretKeyBody
    ],
    imports: [
        RouterModule.forChild(routes),
        MatInputModule,
        FormsModule
    ]
})
export class AuthModule {}