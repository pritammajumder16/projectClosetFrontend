import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthServiceService } from "../services/auth-service.service";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "../common/error-dialog/error-dialog.component";

export const canActivateAdmin:CanActivateFn=(route:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>{
    const _authService = inject(AuthServiceService)
    const _dialog = inject(MatDialog)
    if(_authService.getData().token && _authService.getData().roleId==1){
        return true
    }
    _dialog.open(ErrorDialogComponent,{data:{message:"You need to be in an administrator account to access this route"}})
    const router = inject(Router)
    router.navigate(['/auth/login']);
    return false;
}
export const canActivateAdminChild:CanActivateChildFn=(childRoute:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>{
    return canActivateAdmin(childRoute,state)
}