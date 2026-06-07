import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-kosten-budget',
  imports: [],
  templateUrl: './kosten-budget.html',
})
export class KostenBudget implements AfterViewInit, OnDestroy {
  @ViewChild('costChart') costChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('donutWrap') donutWrapRef!: ElementRef<HTMLDivElement>;

  private chart: any;

  readonly labels = ['Microsoft', 'Adobe', 'Atlassian', 'Salesforce', 'Autodesk', 'Zoom'];
  readonly data = [120000, 56000, 42000, 38000, 30000, 26000];
  readonly colors = ['#3b82f6', '#d946ef', '#34d399', '#fbbf24', '#a78bfa', '#38bdf8'];

  ngAfterViewInit(): void {
    this.buildChart();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private buildChart(): void {
    const canvas = this.costChartRef?.nativeElement;
    const wrap = this.donutWrapRef?.nativeElement;
    if (!canvas || !wrap) return;

    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
    Chart.defaults.color = '#64748b';

    // custom tooltip element
    const tip = document.createElement('div');
    tip.className =
      'pointer-events-none absolute z-30 hidden whitespace-nowrap rounded-xl border border-white/[0.12] bg-[#0b1020]/95 px-3 py-2 text-xs shadow-2xl backdrop-blur-md';
    wrap.appendChild(tip);

    const externalTip = (ctx: any) => {
      const { chart, tooltip } = ctx;
      if (tooltip.opacity === 0) {
        tip.classList.add('hidden');
        return;
      }
      const dp = tooltip.dataPoints?.[0];
      if (!dp) return;
      const color = dp.dataset.backgroundColor[dp.dataIndex];
      tip.innerHTML =
        `<div class="flex items-center gap-2"><span class="inline-block h-2.5 w-2.5 rounded-full" style="background:${color}"></span><span class="font-semibold text-white">${dp.label}</span></div>` +
        `<div class="mt-0.5 text-slate-300 tabular-nums">${dp.parsed.toLocaleString('de-DE')} €</div>`;
      tip.classList.remove('hidden');
      const a = chart.chartArea;
      const cx = (a.left + a.right) / 2,
        cy = (a.top + a.bottom) / 2;
      let dx = tooltip.caretX - cx,
        dy = tooltip.caretY - cy;
      const L = Math.hypot(dx, dy) || 1;
      dx /= L;
      dy /= L;
      const R = Math.min(a.right - a.left, a.bottom - a.top) / 2 + 14;
      tip.style.left = cx + dx * R + 'px';
      tip.style.top = cy + dy * R + 'px';
      tip.style.transform = `translate(${dx >= 0 ? '0%' : '-100%'}, ${dy >= 0 ? '0%' : '-100%'})`;
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.chart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: this.colors,
            borderColor: 'rgba(8,11,22,0.9)',
            borderWidth: 3,
            hoverOffset: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        animation: reduceMotion ? false : { animateRotate: true, duration: 900 },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false, external: externalTip },
        },
      },
    });
  }
}
