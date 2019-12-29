import Observable from '../src/pipeline/observable'
import {Subject, Subscription} from 'rxjs';

describe('singltonTest', function() {
    it('chceksForInstances', function() {
      let instance1 = Observable.getInstance();
      let instance2 = Observable.getInstance();
      expect(instance1 === instance2).toBe(true);   
  });})

  describe('createsEventStream', function() {
    it('chceksForEventStream', function() {
        let Obs = Observable.getInstance();
        Obs.createEventStream('test');
      expect(typeof(Obs.eventStreams['test']) === typeof(new Subject())).toBe(true);   
  });})

  describe('createsObserver', function() {
    it('chceksForObserver', function() {
        let testTitle = 'NA'
        let Obs = Observable.getInstance();
        Obs.observe({name: 'test',
        cb: (title: string) => { testTitle = title },
        ecb: (er: string) => {testTitle = er},
        onCompletion: () => testTitle = 'completed',});
      expect(typeof(Obs.subscriptions['test']) === typeof(new Subscription())).toBe(true);   
  });})

  describe('Emmits', function() {
    it('chceksForEmmits', function() {
        let testTitle = 'NA'
        let Obs = Observable.getInstance();
        Obs.observe({name: 'test',
        cb: (title: string) => { testTitle = title },
        ecb: (er: string) => {testTitle = er},
        onCompletion: () => testTitle = 'completed',});
        Obs.emmitEvent('test', 'this is a test emit')
      expect(testTitle === 'this is a test emit').toBe(true);   
  });})

