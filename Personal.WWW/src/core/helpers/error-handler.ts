import { HttpErrorResponse } from "@angular/common/http";

const AppErrorHandler = {
    handle(resp: HttpErrorResponse) {
        if (resp.error) {
            resp.error.errors
        }
    }
}