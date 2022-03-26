import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { createPopper } from "@popperjs/core";

@Component({
    selector: 'minjus-indicadores-header',
    templateUrl: './header.layout.html',
})
export class HeaderLayout implements AfterViewInit {
    dropdownPopoverShow = false;
    
    @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
    @ViewChild("popoverDropdownRef", { static: false })
    popoverDropdownRef: ElementRef;

    ngAfterViewInit() {
        createPopper(
            this.btnDropdownRef.nativeElement,
            this.popoverDropdownRef.nativeElement,
            {
                placement: "bottom-start",
            }
        );
    }

    toggleDropdown(event) {
        event.preventDefault();
        if (this.dropdownPopoverShow) {
            this.dropdownPopoverShow = false;
        } else {
            this.dropdownPopoverShow = true;
        }
    }
}
