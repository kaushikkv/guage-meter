import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);

/**
 * Range sample changes
 */
import { CircularGauge, Annotations, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { Slider, SliderChangeEventArgs  } from '@syncfusion/ej2-inputs';
CircularGauge.Inject(Annotations);
let sliderValue: number = 6;



    let circulargauge: CircularGauge = new CircularGauge({

        loaded: (args: ILoadedEventArgs) => {
            let annotation: Element = document.getElementById(args.gauge.element.id + '_Annotations_0');
            if (annotation) {
               annotationRender('slider', circulargauge.axes[0].pointers[0].value);
            }
        },
        title: 'Progress Tracker',
            titleStyle: { size: '18px', },
            axes: [{
                annotations: [{
                            content: '<div id="pointervalue" style="font-size:35px;width:120px;text-align:center">' +
                            sliderValue.toString() + '/10</div>',
                            angle: 0,
                            zIndex: '1',
                            radius: '0%'
                        },
                        {
                            content: '<div id="slider" style="height:70px;width:250px;"></div>',
                            angle: 0,
                            zIndex: '1',
                            radius: '-40%'
                        },
                ],
                lineStyle: { width: 0 },
                labelStyle: {
                    position: 'Inside', useRangeColor: true,
                    font: { size: '0px', color: 'white', fontFamily: 'Roboto', fontStyle: 'Regular' }
                }, majorTicks: { height: 0, }, minorTicks: { height: 0 },
                startAngle: 265, endAngle: 95, minimum: 0, maximum: 10, radius: '80%',
                ranges: [
                    {
                        start: 0, end: 100,
                        radius: '90%',
                        startWidth: 30, endWidth: 30,
                        color: '#E0E0E0',
                        roundedCornerRadius: 20
                    },
                ],
                pointers: [{
                    roundedCornerRadius: 20,
                    value: 6,
                    type: 'RangeBar',
                    radius: '90%',
                    color: '#e5ce20',
                    border: {
                        color: 'grey',
                        width: 0
                    },
                    animation: {
                        enable: false
                    },
                    pointerWidth: 30
                }]
            }]
    });
    circulargauge.appendTo('#range-container');

    function annotationRender(id: string, sliderValue: number): void {
        let first: Slider = new Slider({
            // Set the value for slider
            min: 0, max: 10,
            type: 'MinRange',
            limits: { enabled: true, minStart: 0, minEnd: 10 },
            value: sliderValue,
            change: (args: SliderChangeEventArgs) => {
                sliderValue = args.value as number;
                if (!isNaN(sliderValue)) {
                    circulargauge['isProtectedOnChange'] = true;
                    if (sliderValue >= 0 && sliderValue < 2) {
                        circulargauge.axes[0].pointers[0].color = '#ea501a';
                    } else if (sliderValue >= 2 && sliderValue < 4) {
                        circulargauge.axes[0].pointers[0].color = '#f79c02';
                    } else if (sliderValue >= 4 && sliderValue < 6) {
                        circulargauge.axes[0].pointers[0].color = '#e5ce20';
                    } else if (sliderValue >= 6 && sliderValue < 8) {
                        circulargauge.axes[0].pointers[0].color = '#a1cb43';
                    } else if (sliderValue >= 8 && sliderValue < 10) {
                        circulargauge.axes[0].pointers[0].color = '#82b944';
                    }
                    circulargauge.setPointerValue(0, 0, sliderValue);
                    if (document.getElementById('pointervalue')) {
                        document.getElementById('pointervalue').innerHTML = circulargauge.axes[0].pointers[0].value.toString() + '/10';
                    }
                }
            }
        });
        first.appendTo('#' + id);
    }

