import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignupBody } from "./pages/signup/signup.component";
import { AuthHeaderComponent } from "./components/auth-header/auth-header.component";

const routes: Routes = [
    {
        path: "signup",
        component : SignupBody
    }
]

@NgModule({
    declarations: [
        SignupBody,
        AuthHeaderComponent
    ],
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class AuthModule {}