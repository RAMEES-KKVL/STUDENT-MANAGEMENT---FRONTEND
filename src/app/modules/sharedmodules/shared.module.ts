import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeHeaderComponent } from "./home-header/homeHeader.component";

@NgModule({
    declarations: [
        HomeHeaderComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        HomeHeaderComponent
    ]
})
export class SharedModule {}