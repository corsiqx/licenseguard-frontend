import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface KpiEntry {
  value: number;
  decimals: number;
  suffix: string;
  hidden: boolean;
}

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('usageChart') usageChartRef!: ElementRef<HTMLCanvasElement>;

  // ── KPIs (statische Werte, kein count-up) ─────────────────────
  kpis: KpiEntry[] = [
    { value: 123456.78, decimals: 2, suffix: ' €', hidden: false },
    { value: 1284, decimals: 0, suffix: '', hidden: false },
    { value: 312, decimals: 0, suffix: '', hidden: false },
  ];

  // ── chart ─────────────────────────────────────────────────────
  readonly chartLabels = [
    'Jan',
    'Feb',
    'Mär',
    'Apr',
    'Mai',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dez',
  ];
  readonly chartBenutzt = [5, 12, 16, 19, 20, 24, 29, 32, 34, 36, 37, 38];
  readonly chartUnbenutzt = [18, 24, 27, 22, 18, 12, 12, 30, 37, 38, 34, 28];

  seriesVisible = [true, true];

  private chart: any;

  // ── lifecycle ─────────────────────────────────────────────────
  ngAfterViewInit(): void {
    this.buildChart();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  // ── display helpers ───────────────────────────────────────────
  formatDE(n: number, dec: number): string {
    return n.toLocaleString('de-DE', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }

  kpiDisplay(k: KpiEntry): string {
    return k.hidden ? '••••••' : this.formatDE(k.value, k.decimals) + k.suffix;
  }

  toggleHide(k: KpiEntry): void {
    k.hidden = !k.hidden;
  }

  // ── chart ─────────────────────────────────────────────────────
  toggleSeries(index: number): void {
    if (!this.chart) return;
    const vis = this.chart.isDatasetVisible(index);
    this.chart.setDatasetVisibility(index, !vis);
    this.seriesVisible[index] = !vis;
    this.chart.update();
  }

  private buildChart(): void {
    const canvas = this.usageChartRef?.nativeElement;
    if (!canvas) return;

    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
    Chart.defaults.color = '#64748b';

    const gradient = (ctx: any, area: any, from: string, to: string) => {
      if (!area) return from;
      const g = ctx.createLinearGradient(0, area.top, 0, area.bottom);
      g.addColorStop(0, from);
      g.addColorStop(1, to);
      return g;
    };

    const crosshair = {
      id: 'crosshair',
      afterDraw(chart: any) {
        const a = chart.tooltip?._active;
        if (!a?.length) return;
        const x = a[0].element.x,
          { top, bottom } = chart.chartArea,
          ctx = chart.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(226,232,240,0.22)';
        ctx.moveTo(x, top);
        ctx.lineTo(x, bottom);
        ctx.stroke();
        ctx.restore();
      },
    };

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Benutzt',
            data: this.chartBenutzt,
            borderColor: '#3b82f6',
            backgroundColor: (c: any) =>
              gradient(
                c.chart.ctx,
                c.chart.chartArea,
                'rgba(59,130,246,0.34)',
                'rgba(59,130,246,0)',
              ),
            pointHoverBackgroundColor: '#3b82f6',
            pointHoverBorderColor: 'rgba(59,130,246,0.30)',
          },
          {
            label: 'Unbenutzt',
            data: this.chartUnbenutzt,
            borderColor: '#d946ef',
            backgroundColor: (c: any) =>
              gradient(
                c.chart.ctx,
                c.chart.chartArea,
                'rgba(217,70,239,0.30)',
                'rgba(217,70,239,0)',
              ),
            pointHoverBackgroundColor: '#d946ef',
            pointHoverBorderColor: 'rgba(217,70,239,0.30)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1100, easing: 'easeOutQuart' },
        interaction: { mode: 'index', intersect: false },
        elements: {
          line: { tension: 0.4, borderWidth: 3, fill: true },
          point: { radius: 0, hoverRadius: 5, hitRadius: 14, hoverBorderWidth: 3 },
        },
        scales: {
          y: {
            min: 0,
            suggestedMax: 42,
            ticks: { stepSize: 5, padding: 10 },
            grid: { color: 'rgba(255,255,255,0.05)', drawTicks: false },
            border: { display: false },
          },
          x: { grid: { display: false }, ticks: { padding: 8 }, border: { display: false } },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(8,11,22,0.96)',
            borderColor: 'rgba(148,163,184,0.2)',
            borderWidth: 1,
            titleColor: '#e2e8f0',
            bodyColor: '#cbd5e1',
            padding: 12,
            cornerRadius: 12,
            boxPadding: 6,
            usePointStyle: true,
            titleFont: { weight: 700, size: 13 },
            bodyFont: { size: 12 },
            callbacks: { label: (c: any) => ` ${c.dataset.label}: ${c.parsed.y} Lizenzen` },
          },
        },
      },
      plugins: [crosshair],
    });
  }
}
