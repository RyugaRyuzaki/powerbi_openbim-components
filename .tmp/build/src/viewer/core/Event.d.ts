/**
 * Simple event handler by
 * [Jason Kleban](https://gist.github.com/JasonKleban/50cee44960c225ac1993c922563aa540).
 * Keep in mind that:
 * - If you want to remove it later, you might want to declare the callback as
 * an object.
 * - If you want to maintain the reference to `this`, you will need to declare
 * the callback as an arrow function.
 */
export declare class Event<T> {
    /**
     * Add a callback to this event instance.
     * @param handler - the callback to be added to this event.
     */
    on(handler: T extends void ? {
        (): void;
    } : {
        (data: T): void;
    }): void;
    /**
     * Removes a callback from this event instance.
     * @param handler - the callback to be removed from this event.
     */
    off(handler: T extends void ? {
        (): void;
    } : {
        (data: T): void;
    }): void;
    /**
     * Triggers all the callbacks assigned to this event.
     */
    trigger: T extends void ? {
        (): void;
    } : {
        (data?: T): void;
    };
    /**
     * Gets rid of all the suscribed events.
     */
    reset(): void;
    private handlers;
}
