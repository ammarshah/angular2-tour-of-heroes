import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import 'rxjs/add/operator/toPromise';


@Injectable()

export class HeroService {
	private heroesUrl = 'app/heroes';  // URL to web api
	
	constructor(private http: Http) { }

	getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

  // See the "Take it slow" appendix
  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
    );
  }

  getHero(id: number) {
    return this.getHeroes()
                .then(heroes => heroes.filter(hero => hero.id === id)[0]);
	}

	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

}