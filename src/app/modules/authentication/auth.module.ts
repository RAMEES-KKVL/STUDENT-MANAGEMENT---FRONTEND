import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignupBody } from "./pages/signup/signup.component";
import { AuthHeaderComponent } from "./components/auth-header/auth-header.component";
import { AuthSubmitButtonComponent } from "./components/auth-submit-button/auth-submitButton.component";
import { MatInputModule } from "@angular/material/input";
import { LoginBody } from "./pages/login/login.component";
import { OtpBody } from "./pages/otp/otp.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SecretKeyBody } from "./pages/admin-secretKey/secretKey.component";
import { ForgetPasswordBody } from "./pages/forget-password/forgetPassword.component";
import { ResetPasswordBody } from "./pages/reset-password/resetPassword.component";
import { CommonModule } from "@angular/common";

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
    },
    {
        path : "forget_password",
        component : ForgetPasswordBody
    },
    {
        path : "reset_password",
        component : ResetPasswordBody
    }
]

@NgModule({
    declarations: [
        AuthHeaderComponent,
        AuthSubmitButtonComponent,
        SignupBody,
        LoginBody,
        OtpBody,
        SecretKeyBody,
        ForgetPasswordBody,
        ResetPasswordBody
    ],
    imports: [
        RouterModule.forChild(routes),
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class AuthModule {}