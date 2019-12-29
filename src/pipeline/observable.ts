import { Subscription, Subject } from 'rxjs';

interface observeArguments {
    name: string,
    cb: (title: string) => any,
    ecb: (title: string) => any,
    onCompletion: () => any,
}


export default class Observable$ {

    // Singleton pattern
    private static instance: Observable$;

    eventStreams: Record<string, Subject<string>>;
    subscriptions: Record<string, Subscription>;

    private constructor() {
        this.eventStreams = {}
        this.subscriptions = {}
    }

    // Singleton check
    public static getInstance(): Observable$ {
        if (!Observable$.instance) {
            Observable$.instance = new Observable$();
        }

        return Observable$.instance;
    }

    public createEventStream: (name: string) => void = name => {
        this.eventStreams[name] = new Subject();

    }

    public emmitEvent: (name: string, data: string) => void = (name, data) => {
        this.eventStreams[name].next(data);
    }
    public dropStream: (name: string) => void = name => {
        this.eventStreams[name].complete();
    }
    // business logic
    public observe: (options: observeArguments) => void = (options) => {
        let observer = this.eventStreams[options.name].subscribe((x: string) => options.cb(x), (x: string) => options.ecb(x), () => options.onCompletion());
        this.subscriptions[options.name] = observer;
    }

    public dropObserve = (name: string) => {
        this.subscriptions[name].unsubscribe();
    }
}
