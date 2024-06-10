import { MonoTypeOperatorFunction } from 'rxjs';
import { OperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { operate } from 'rxjs/internal/util/lift';

export function selfUnsubscribe<T>(): MonoTypeOperatorFunction<T> {
  return operate((source, subscriber) => {
    source.subscribe(
      new OperatorSubscriber<T>(subscriber, (value) => {
        subscriber.next(value);
        subscriber.complete();
        subscriber.unsubscribe();
      })
    );
  });
}
