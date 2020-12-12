+++
author = "Thanish"
categories = ["js", "angular"]
date = 2017-06-27T18:30:00Z
description = ""
draft = false
slug = "debugging-duplicate-click-events"
tags = ["js", "angular"]
title = "Debugging duplicate click events"

+++


While trying to debug this issue, we found out a couple of interesting things about how Angular manages event handlers.

The double click event bug can be recreated easily with the following [example app](https://github.com/mnmtanish/test-ng-event). The important parts are:

The “click” Output of the button component:

```
<button (click)="clicked($event)">
  <ng-content></ng-content>
</button>

export class TestButtonComponent implements OnInit {
  @Output() click: EventEmitter<MouseEvent>;

  clicked(e: MouseEvent) {
    console.log('TestButtonComponent: clicked!');
    this.click.emit(e)
  }

  ...
}
```

and the code which listens to the event:

```
<app-test-button (click)="clicked($event)">
  Test Button
</app-test-button>

export class AppComponent {
  clicked(e: MouseEvent) {
    console.log('AppComponent: clicked!');
  }
}
```

When we ran the app with a similar code, the “TestButtonComponent: clicked!” text gets logged once as expected but the “AppComponent: clicked!” text gets logged twice.

Let’s add a breakpoint on the AppComponent click event handler.

{{< figure src="/imported/1-D2GJjRg5Ss_4KcskGrmN-Q.png" caption="Screenshot taken during the second click event emit with the stack trace" >}}

If we analyze [stack traces](https://github.com/mnmtanish/test-ng-event) on the event handler, we can see that the events are originating from different sources.

1. <button>.click → TestButtonComponent.click → !
2. <app-test-button>.click → !

This brings us to research on how Angular binds to events on components. The first event listed above was easy to reason about as it is what we were expecting in our example. The “click” DOM event on the button element fires the “click” Output which calls the event handler.

The second event on the other hand is created from a DOM event on the component element. This event listener is created by the [DomEventsPlugin](https://github.com/angular/angular/blob/5293794316cc1b0f57d5d88b3fefdf6ae29d0d97/packages/platform-browser/src/dom/events/dom_events.ts) on the Angular [EventManager](https://github.com/angular/angular/blob/5293794316cc1b0f57d5d88b3fefdf6ae29d0d97/packages/platform-browser/src/dom/events/event_manager.ts). (If we use event names handled by HammerJS such as “tap” or “pinch” the [HammerGesturesPlugin](https://github.com/angular/angular/blob/5293794316cc1b0f57d5d88b3fefdf6ae29d0d97/packages/platform-browser/src/dom/events/hammer_gestures.ts) will be used.)

> This means that all custom events used throughout the app also has event listeners on the DOM with that name on each component.

Angular will use the DomEventsPlugin for ALL event names if no other plugins support that event. This means that all custom events used throughout the app also has event listeners on the DOM with that name on each component. This can be confirmed using Chrome developer tools.

{{< figure src="/imported/1-cwXIknjf3--tjO2QSSo3MQ.png" caption="Screenshot of the list of event listeners on the app-test-button element" >}}

It requires more experiments to check the performance impact on the app caused because of this approach. But the point I like to emphasize here is that when using events in Angular, it is important to be aware of this in order to avoid any unexpected behavior.

To learn more about the Angular EventManager, I highly recommend taking 5 minutes to go through [the source code](https://github.com/angular/angular/tree/5293794316cc1b0f57d5d88b3fefdf6ae29d0d97/packages/platform-browser/src/dom/events). Also check this [blog post](https://medium.com/@TheLarkInn/hacking-angular2-binding-multiple-dom-events-f781b14ef676) about writing custom EventManagerPlugins.

**Edit:** fixed a mistake in the example code about related to event bubbling.
