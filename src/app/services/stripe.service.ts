import { Injectable } from '@angular/core';

import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../environments/environment.dev';
@Injectable({
  providedIn: 'root',
})
export class StripeService {
  public stripePromise = loadStripe(environment.STRIPE_PUBLISHABLE_KEY);
}
