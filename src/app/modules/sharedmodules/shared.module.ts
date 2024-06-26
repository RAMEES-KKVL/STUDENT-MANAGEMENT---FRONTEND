import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeHeaderComponent } from "./home-header/homeHeader.component";
import { HomeFooterComponent } from "./home-footer/homeFooter.component";

@NgModule({
    declarations: [
        HomeHeaderComponent,
        HomeFooterComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        HomeHeaderComponent,
        HomeFooterComponent
    ]
})
export class SharedModule {}
