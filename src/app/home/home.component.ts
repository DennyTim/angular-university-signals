import {
  Component,
  computed,
  effect,
  EffectRef,
  inject,
  Injector,
  signal
} from "@angular/core";
import {
  MatTab,
  MatTabGroup
} from "@angular/material/tabs";

@Component({
  selector: "home",
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss"
})
export class HomeComponent {
  counter = signal(0);

  tenXCounter = computed(() => {
    const val = this.counter();
    return val * 10;
  });

  hundredXCounter = computed(() => {
    const val = this.tenXCounter();

    return val * 10;
  });

  effectRef: EffectRef | null = null;
  injector = inject(Injector);

  constructor() {

    this.effectRef = effect((onCleanup) => {

      const counter = this.counter();

      const timeout = setTimeout(() => {
        window.console.log(`counter value: ${counter}`);
      }, 1000);

      onCleanup(() => {
        console.log(`Calling clean up`);
        clearTimeout(timeout);
      });
    });

    // TODO: How to fix ERROR RuntimeError: NG0600: Writing to signals is not allowed
    //  in a `computed` or an `effect` by default.
    /*** Solution: { allowSignalWrites: true } */
    // effect(() => {
    //   window.console.log(`counter value: ${this.counter()}`);
    //   this.append();
    // }, { allowSignalWrites: true });

    // TODO: How to fix ERROR RuntimeError: NG0203: effect()
    //  can only be used within an injection context
    /*** Solution: { injector: this.injector } */
    // afterNextRender(() => {
    //   effect(() => {
    //     window.console.log(`counter value: ${this.counter()}`);
    //   }, { injector: this.injector });
    // });
  }

  public append(): void {
    this.counter.update(val => val + 1);
  }

  public cleanup(): void {
    this.effectRef?.destroy();
  }
}
