import TitleObservable from '../observable';
import { Subject } from 'rxjs';

export default class Title 
{
    private static instance: Title;

    private  static title: Subject<string>;
    private  titleObservable: TitleObservable;

    private constructor(){
        
        Title.title = new Subject();
        this.titleObservable = TitleObservable.getInstance();
        this.titleObservable.createEventStream('titleStream');
        this.titleObservable.observe(
            {name: 'titleStream',
            cb: (title: string) => {
                Title.title.next(title)
            },
            ecb: (er: string) => Title.title.next(er),
            onCompletion: () => Title.title.complete(),}
        )
    }

    public static getInstance(): Title {
        if (!Title.instance) {
            Title.instance = new Title();
        }

        return Title.instance;
    }

    public getTitle (): Subject<string> {
        return Title.title;
    }

    public callApi (data:number):void {
        fetch(`https://jsonplaceholder.typicode.com/posts/${data}`)
        .then(response => response.json())
        .then(json=>JSON.stringify(json))
        .then((string)=>this.titleObservable.emmitEvent('titleStream', string))
    }

}