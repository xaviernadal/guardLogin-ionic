import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';

export const INTRO_KEY = 'intro-seen';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {

  constructor(private router: Router){}

  async canLoad(): Promise<boolean> {
    const isIntro = await Storage.get({ key: INTRO_KEY });
    if (isIntro && (isIntro.value === 'true')) {
      return true;
    } else {
      this.router.navigateByUrl('/intro', {replaceUrl:true});
      return false;
    }
  }

}
