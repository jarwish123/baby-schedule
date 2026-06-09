import { useState, useEffect } from 'react';
import './App.css';

const STORAGE_KEY = 'baby-schedule-data';

const MONTH_SCHEDULES = {
  0: {
    title: '新生儿 (0-1个月)',
    desc: '每天睡16-20小时，每2-3小时喂一次',
    schedule: [
      { time: '06:00', activity: '喂奶 + 拍嗝', icon: '🍼' },
      { time: '06:30', activity: '换尿布 + 睡觉', icon: '😴' },
      { time: '09:00', activity: '喂奶 + 拍嗝', icon: '🍼' },
      { time: '09:30', activity: '换尿布 + 睡觉', icon: '😴' },
      { time: '12:00', activity: '喂奶 + 拍嗝', icon: '🍼' },
      { time: '12:30', activity: '换尿布 + 睡觉', icon: '😴' },
      { time: '15:00', activity: '喂奶 + 拍嗝', icon: '🍼' },
      { time: '15:30', activity: '换尿布 + 睡觉', icon: '😴' },
      { time: '18:00', activity: '喂奶 + 拍嗝', icon: '🍼' },
      { time: '18:30', activity: '洗澡/抚触', icon: '🛁' },
      { time: '19:00', activity: '喂奶 + 睡觉', icon: '😴' },
      { time: '22:00', activity: '梦中喂奶', icon: '🍼' },
      { time: '02:00', activity: '夜奶', icon: '🌙' },
      { time: '04:00', activity: '夜奶', icon: '🌙' },
    ]
  },
  1: {
    title: '1-2个月',
    desc: '清醒时间变长，开始有短暂互动',
    schedule: [
      { time: '06:30', activity: '喂奶 + 拍嗝', icon: '🍼' },
      { time: '07:00', activity: '换尿布 + 俯卧练习', icon: '💪' },
      { time: '08:00', activity: '小睡', icon: '😴' },
      { time: '09:30', activity: '喂奶 + 互动玩耍', icon: '🎯' },
      { time: '11:00', activity: '小睡', icon: '😴' },
      { time: '12:30', activity: '喂奶 + 换尿布', icon: '🍼' },
      { time: '13:30', activity: '小睡', icon: '😴' },
      { time: '15:30', activity: '喂奶 + 户外散步', icon: '🌳' },
      { time: '17:00', activity: '小睡', icon: '😴' },
      { time: '18:30', activity: '喂奶 + 洗澡', icon: '🛁' },
      { time: '20:00', activity: '喂奶 + 睡觉', icon: '😴' },
      { time: '23:00', activity: '梦中喂奶', icon: '🍼' },
      { time: '03:00', activity: '夜奶', icon: '🌙' },
    ]
  },
  2: {
    title: '2-3个月',
    desc: '作息逐渐规律，夜奶次数减少',
    schedule: [
      { time: '07:00', activity: '起床 + 喂奶', icon: '🌅' },
      { time: '08:00', activity: '俯卧练习 + 互动', icon: '💪' },
      { time: '09:00', activity: '上午小睡', icon: '😴' },
      { time: '10:30', activity: '喂奶 + 换尿布', icon: '🍼' },
      { time: '11:30', activity: '感官游戏', icon: '🎯' },
      { time: '12:30', activity: '午睡', icon: '😴' },
      { time: '14:30', activity: '喂奶 + 户外', icon: '🌳' },
      { time: '16:00', activity: '下午小睡', icon: '😴' },
      { time: '17:30', activity: '喂奶 + 亲子互动', icon: '🍼' },
      { time: '18:30', activity: '洗澡 + 抚触', icon: '🛁' },
      { time: '19:30', activity: '喂奶 + 入睡', icon: '😴' },
      { time: '01:00', activity: '夜奶 (1-2次)', icon: '🌙' },
    ]
  },
  3: {
    title: '3-4个月',
    desc: '睡眠倒退期，白天小睡3-4次',
    schedule: [
      { time: '07:00', activity: '起床 + 喂奶', icon: '🌅' },
      { time: '08:30', activity: '俯卧 + 翻身练习', icon: '💪' },
      { time: '09:30', activity: '上午小睡 (45分钟)', icon: '😴' },
      { time: '11:00', activity: '喂奶 + 游戏', icon: '🍼' },
      { time: '12:30', activity: '午睡 (1.5-2小时)', icon: '😴' },
      { time: '14:30', activity: '喂奶 + 户外活动', icon: '🌳' },
      { time: '16:00', activity: '下午小睡 (45分钟)', icon: '😴' },
      { time: '17:00', activity: '喂奶 + 互动', icon: '🍼' },
      { time: '18:30', activity: '洗澡 + 睡前仪式', icon: '🛁' },
      { time: '19:30', activity: '喂奶 + 入睡', icon: '😴' },
      { time: '23:00', activity: '梦中喂奶', icon: '🍼' },
    ]
  },
  4: {
    title: '4-5个月',
    desc: '开始添加辅食，出牙期可能夜醒',
    schedule: [
      { time: '07:00', activity: '起床 + 喂奶', icon: '🌅' },
      { time: '08:30', activity: '大运动练习', icon: '💪' },
      { time: '09:30', activity: '上午小睡', icon: '😴' },
      { time: '11:00', activity: '辅食 (米粉/菜泥) + 喂奶', icon: '🥣' },
      { time: '12:30', activity: '午睡 (1.5-2小时)', icon: '😴' },
      { time: '14:30', activity: '喂奶 + 玩耍', icon: '🍼' },
      { time: '16:00', activity: '下午小睡', icon: '😴' },
      { time: '17:30', activity: '辅食 + 喂奶', icon: '🥣' },
      { time: '18:30', activity: '洗澡 + 绘本', icon: '📖' },
      { time: '19:30', activity: '喂奶 + 入睡', icon: '😴' },
    ]
  },
  5: {
    title: '5-6个月',
    desc: '辅食2顿，坐立练习，夜间可连续睡6-8小时',
    schedule: [
      { time: '07:00', activity: '起床 + 喂奶', icon: '🌅' },
      { time: '08:00', activity: '辅食早餐 (辅食+奶)', icon: '🥣' },
      { time: '09:30', activity: '上午小睡 (1小时)', icon: '😴' },
      { time: '11:00', activity: '喂奶 + 坐立练习', icon: '💪' },
      { time: '12:30', activity: '午睡 (1.5-2小时)', icon: '😴' },
      { time: '14:30', activity: '喂奶 + 户外', icon: '🌳' },
      { time: '17:00', activity: '辅食晚餐 + 喂奶', icon: '🥣' },
      { time: '18:30', activity: '洗澡 + 睡前仪式', icon: '🛁' },
      { time: '19:30', activity: '喂奶 + 入睡', icon: '😴' },
    ]
  }
};

const DEFAULT_DATA = {
  feeding: [],
  sleep: [],
  diaper: [],
  growth: [],
  babyName: '',
  birthDate: '',
  babyGender: 'boy',
};

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_DATA, ...JSON.parse(raw) };
  } catch (e) { /* ignore */ }
  return { ...DEFAULT_DATA };
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function fmtDate(d) {
  const date = new Date(d);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function fmtTime(d) {
  return new Date(d).toTimeString().slice(0, 5);
}

function now() {
  return new Date().toISOString();
}

function today() {
  return fmtDate(new Date());
}

function getDayRecords(records, date) {
  return records.filter(r => r.date === date);
}

function calcDuration(start, end) {
  if (!start || !end) return '--';
  const ms = new Date(end) - new Date(start);
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function getBabyAge(birthDate) {
  if (!birthDate) return null;
  const b = new Date(birthDate);
  const n = new Date();
  const months = (n.getFullYear() - b.getFullYear()) * 12 + n.getMonth() - b.getMonth();
  const days = n.getDate() - b.getDate();
  const totalMonths = days < 0 ? months - 1 : months;
  const remainingDays = days < 0 ? new Date(n.getFullYear(), n.getMonth(), 0).getDate() + days : days;
  return { months: Math.max(0, totalMonths), days: Math.max(0, remainingDays) };
}

function getMonthIndex(months) {
  if (months <= 0) return 0;
  if (months >= 5) return 5;
  return months;
}

function Tab({ label, active, onClick }) {
  return (
    <button className={`tab ${active ? 'tab-active' : ''}`} onClick={onClick}>
      {label}
    </button>
  );
}

function Card({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>;
}

export default function App() {
  const [data, setData] = useState(loadData);
  const [tab, setTab] = useState('today');
  const [selectedDate, setSelectedDate] = useState(today());
  const [showSetup, setShowSetup] = useState(!data.birthDate);

  useEffect(() => { saveData(data); }, [data]);

  const update = (key, value) => setData(prev => ({ ...prev, [key]: value }));
  const addRecord = (type, record) => {
    setData(prev => ({
      ...prev,
      [type]: [...prev[type], { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), ...record }]
    }));
  };
  const delRecord = (type, id) => {
    setData(prev => ({ ...prev, [type]: prev[type].filter(r => r.id !== id) }));
  };

  const age = getBabyAge(data.birthDate);
  const monthIdx = age ? getMonthIndex(age.months) : 0;
  const todayRecords = {
    feeding: getDayRecords(data.feeding, selectedDate),
    sleep: getDayRecords(data.sleep, selectedDate),
    diaper: getDayRecords(data.diaper, selectedDate),
  };

  const todayStats = {
    feedCount: todayRecords.feeding.length,
    totalFeed: todayRecords.feeding.reduce((s, r) => s + (r.amount || 0), 0),
    sleepTotal: todayRecords.sleep.reduce((s, r) => {
      if (!r.startTime || !r.endTime) return s;
      return s + (new Date(r.endTime) - new Date(r.startTime));
    }, 0),
    diaperCount: todayRecords.diaper.length,
    wetCount: todayRecords.diaper.filter(r => r.diaperType === 'wet' || r.diaperType === 'both').length,
    poopCount: todayRecords.diaper.filter(r => r.diaperType === 'poop' || r.diaperType === 'both').length,
  };

  if (showSetup) {
    return <SetupWizard data={data} update={update} onDone={() => setShowSetup(false)} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>{data.babyName ? `${data.babyName}的` : '宝宝'}成长日记</h1>
        {age && <span className="age-badge">{age.months}个月{age.days}天</span>}
        <button className="btn-sm" onClick={() => setShowSetup(true)}>⚙</button>
      </header>

      <nav className="tab-bar">
        <Tab label="📋 今日" active={tab === 'today'} onClick={() => { setTab('today'); setSelectedDate(today()); }} />
        <Tab label="📅 日历" active={tab === 'calendar'} onClick={() => setTab('calendar')} />
        <Tab label="📊 生长" active={tab === 'growth'} onClick={() => setTab('growth')} />
        <Tab label="📖 月龄指南" active={tab === 'guide'} onClick={() => setTab('guide')} />
      </nav>

      <main className="main-content">
        {tab === 'today' && (
          <TodayView
            date={selectedDate}
            records={todayRecords}
            stats={todayStats}
            addRecord={addRecord}
            delRecord={delRecord}
            updateDate={setSelectedDate}
          />
        )}
        {tab === 'calendar' && (
          <CalendarView
            data={data}
            birthDate={data.birthDate}
            selectedDate={selectedDate}
            onSelectDate={d => { setSelectedDate(d); setTab('today'); }}
          />
        )}
        {tab === 'growth' && (
          <GrowthView
            records={data.growth}
            addRecord={addRecord}
            delRecord={delRecord}
          />
        )}
        {tab === 'guide' && (
          <GuideView monthIdx={monthIdx} />
        )}
      </main>
    </div>
  );
}

function SetupWizard({ data, update, onDone }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(data.babyName);
  const [date, setDate] = useState(data.birthDate);
  const [gender, setGender] = useState(data.babyGender);

  const handleDone = () => {
    update('babyName', name);
    update('birthDate', date);
    update('babyGender', gender);
    onDone();
  };

  return (
    <div className="setup-wizard">
      <div className="setup-card">
        <h2>👶 欢迎！先设置宝宝信息</h2>
        {step === 1 && (
          <div className="setup-step">
            <label>宝宝名字（小名即可）</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="例如：小汤圆"
              autoFocus
            />
            <label>性别</label>
            <div className="gender-toggle">
              <button className={`btn ${gender === 'boy' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setGender('boy')}>👦 男宝</button>
              <button className={`btn ${gender === 'girl' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setGender('girl')}>👧 女宝</button>
            </div>
            <button className="btn btn-primary btn-full" onClick={() => setStep(2)} disabled={!name.trim()}>
              下一步
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="setup-step">
            <label>出生日期</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              max={today()}
            />
            <div className="setup-actions">
              <button className="btn btn-outline" onClick={() => setStep(1)}>上一步</button>
              <button className="btn btn-primary" onClick={handleDone} disabled={!date}>
                开始记录
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TodayView({ date, records, stats, addRecord, delRecord, updateDate }) {
  const [showAdd, setShowAdd] = useState(null);

  const sleepHours = stats.sleepTotal > 0 ? (stats.sleepTotal / 3600000).toFixed(1) : '--';

  const changeDate = (delta) => {
    const d = new Date(date);
    d.setDate(d.getDate() + delta);
    updateDate(fmtDate(d));
  };

  return (
    <div>
      <div className="date-nav">
        <button className="btn-sm" onClick={() => changeDate(-1)}>◀</button>
        <h2 className={`date-title ${date === today() ? 'date-today' : ''}`}>
          {date === today() ? '今天' : date === fmtDate(new Date(Date.now() - 86400000)) ? '昨天' : date}
        </h2>
        <button className="btn-sm" onClick={() => changeDate(1)} disabled={date >= today()}>▶</button>
      </div>

      <div className="stats-row">
        <Card className="stat-card">
          <div className="stat-icon">🍼</div>
          <div className="stat-num">{stats.feedCount}</div>
          <div className="stat-label">喂奶次数</div>
          {stats.totalFeed > 0 && <div className="stat-sub">{stats.totalFeed}ml</div>}
        </Card>
        <Card className="stat-card">
          <div className="stat-icon">😴</div>
          <div className="stat-num">{sleepHours}</div>
          <div className="stat-label">睡眠(h)</div>
        </Card>
        <Card className="stat-card">
          <div className="stat-icon">🧷</div>
          <div className="stat-num">{stats.diaperCount}</div>
          <div className="stat-label">换尿布</div>
          {stats.diaperCount > 0 && <div className="stat-sub">💧{stats.wetCount} 💩{stats.poopCount}</div>}
        </Card>
      </div>

      <div className="add-btns">
        <button className="btn btn-add" onClick={() => setShowAdd(showAdd === 'feeding' ? null : 'feeding')}>+ 记录喂奶</button>
        <button className="btn btn-add" onClick={() => setShowAdd(showAdd === 'sleep' ? null : 'sleep')}>+ 记录睡眠</button>
        <button className="btn btn-add" onClick={() => setShowAdd(showAdd === 'diaper' ? null : 'diaper')}>+ 记录尿布</button>
      </div>

      {showAdd === 'feeding' && <FeedingForm date={date} onAdd={r => { addRecord('feeding', r); setShowAdd(null); }} />}
      {showAdd === 'sleep' && <SleepForm date={date} onAdd={r => { addRecord('sleep', r); setShowAdd(null); }} />}
      {showAdd === 'diaper' && <DiaperForm date={date} onAdd={r => { addRecord('diaper', r); setShowAdd(null); }} />}

      <div className="timeline">
        <h3>今日时间线</h3>
        {[...records.feeding.map(r => ({ ...r, type: 'feeding' })), ...records.sleep.map(r => ({ ...r, type: 'sleep' })), ...records.diaper.map(r => ({ ...r, type: 'diaper' }))]
          .sort((a, b) => new Date(b.startTime || b.time || b.createdAt) - new Date(a.startTime || a.time || a.createdAt))
          .map(record => (
            <TimelineItem key={record.id} record={record} onDelete={() => delRecord(record.type, record.id)} />
          ))}
        {records.feeding.length === 0 && records.sleep.length === 0 && records.diaper.length === 0 && (
          <p className="empty-tip">还没有记录，点击上方按钮开始记录</p>
        )}
      </div>
    </div>
  );
}

function TimelineItem({ record, onDelete }) {
  const icons = { feeding: '🍼', sleep: '😴', diaper: '🧷' };
  const colors = { feeding: '#ff9800', sleep: '#5c6bc0', diaper: '#26a69a' };
  const time = fmtTime(new Date(record.startTime || record.time || record.createdAt));

  let detail = '';
  if (record.type === 'feeding') {
    detail = `${record.feedType === 'bottle' ? '🍶奶瓶' : record.feedType === 'solids' ? '🥣辅食' : '🤱母乳'} ${record.amount ? record.amount + 'ml' : ''} ${record.side || ''} ${record.duration ? record.duration + '分钟' : ''}`;
  } else if (record.type === 'sleep') {
    detail = `${time} - ${record.endTime ? fmtTime(new Date(record.endTime)) : '进行中'} ${record.endTime ? '(' + calcDuration(record.startTime, record.endTime) + ')' : ''}`;
  } else if (record.type === 'diaper') {
    const types = { wet: '💧 小便', poop: '💩 大便', both: '💧💩 都有' };
    detail = `${types[record.diaperType] || record.diaperType} ${record.color || ''}`;
  }

  return (
    <div className="timeline-item" style={{ borderLeftColor: colors[record.type] }}>
      <div className="timeline-time">{time}</div>
      <div className="timeline-icon">{icons[record.type]}</div>
      <div className="timeline-detail">
        <div>{detail}</div>
        {record.note && <div className="timeline-note">📝 {record.note}</div>}
      </div>
      <button className="btn-del" onClick={onDelete}>✕</button>
    </div>
  );
}

function FeedingForm({ date, onAdd }) {
  const [feedType, setFeedType] = useState('breast');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [side, setSide] = useState('');
  const [note, setNote] = useState('');
  const [time, setTime] = useState(fmtTime(new Date()));

  const handleSubmit = (e) => {
    e.preventDefault();
    const startTime = `${date}T${time}:00`;
    onAdd({ feedType, amount: Number(amount) || 0, duration: Number(duration) || 0, side, note, startTime, date, createdAt: now() });
  };

  return (
    <Card className="form-card">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>方式</label>
          <select value={feedType} onChange={e => setFeedType(e.target.value)}>
            <option value="breast">🤱 亲喂</option>
            <option value="bottle">🍶 瓶喂</option>
            <option value="solids">🥣 辅食</option>
          </select>
        </div>
        <div className="form-row">
          <label>时间</label>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} />
        </div>
        {feedType === 'bottle' && (
          <div className="form-row">
            <label>奶量(ml)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="例如: 120" />
          </div>
        )}
        {feedType === 'breast' && (
          <>
            <div className="form-row">
              <label>时长(分钟)</label>
              <input type="number" value={duration} onChange={e => setDuration(e.target.value)} placeholder="例如: 20" />
            </div>
            <div className="form-row">
              <label>左右</label>
              <select value={side} onChange={e => setSide(e.target.value)}>
                <option value="">--</option>
                <option value="左侧">左侧</option>
                <option value="右侧">右侧</option>
                <option value="双侧">双侧</option>
              </select>
            </div>
          </>
        )}
        {feedType === 'solids' && (
          <div className="form-row">
            <label>食量(g)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="例如: 30" />
          </div>
        )}
        <div className="form-row">
          <label>备注</label>
          <input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="例如: 吐奶了" />
        </div>
        <button type="submit" className="btn btn-primary btn-full">保存</button>
      </form>
    </Card>
  );
}

function SleepForm({ date, onAdd }) {
  const [startTime, setStartTime] = useState(fmtTime(new Date(Date.now() - 600000)));
  const [endTime, setEndTime] = useState(fmtTime(new Date()));
  const [quality, setQuality] = useState('good');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      startTime: `${date}T${startTime}:00`,
      endTime: `${date}T${endTime}:00`,
      quality, note, date, createdAt: now()
    });
  };

  return (
    <Card className="form-card">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>开始</label>
          <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
        </div>
        <div className="form-row">
          <label>结束</label>
          <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
        </div>
        <div className="form-row">
          <label>质量</label>
          <select value={quality} onChange={e => setQuality(e.target.value)}>
            <option value="good">😊 安稳</option>
            <option value="normal">😐 一般</option>
            <option value="poor">😰 不安</option>
          </select>
        </div>
        <div className="form-row">
          <label>备注</label>
          <input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="例如: 闹觉厉害" />
        </div>
        <div className="duration-preview">
          睡眠时长: {calcDuration(`${date}T${startTime}:00`, `${date}T${endTime}:00`)}
        </div>
        <button type="submit" className="btn btn-primary btn-full">保存</button>
      </form>
    </Card>
  );
}

function DiaperForm({ date, onAdd }) {
  const [diaperType, setDiaperType] = useState('wet');
  const [color, setColor] = useState('');
  const [note, setNote] = useState('');
  const [time, setTime] = useState(fmtTime(new Date()));

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ diaperType, color, note, time: `${date}T${time}:00`, date, createdAt: now() });
  };

  return (
    <Card className="form-card">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>类型</label>
          <div className="radio-group">
            <label className={`radio-chip ${diaperType === 'wet' ? 'active' : ''}`}>
              <input type="radio" name="type" value="wet" checked={diaperType === 'wet'} onChange={e => setDiaperType(e.target.value)} />
              💧 小便
            </label>
            <label className={`radio-chip ${diaperType === 'poop' ? 'active' : ''}`}>
              <input type="radio" name="type" value="poop" checked={diaperType === 'poop'} onChange={e => setDiaperType(e.target.value)} />
              💩 大便
            </label>
            <label className={`radio-chip ${diaperType === 'both' ? 'active' : ''}`}>
              <input type="radio" name="type" value="both" checked={diaperType === 'both'} onChange={e => setDiaperType(e.target.value)} />
              都有
            </label>
          </div>
        </div>
        <div className="form-row">
          <label>时间</label>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} />
        </div>
        {(diaperType === 'poop' || diaperType === 'both') && (
          <div className="form-row">
            <label>便便颜色</label>
            <select value={color} onChange={e => setColor(e.target.value)}>
              <option value="">--</option>
              <option value="金黄">🟡 金黄 (正常)</option>
              <option value="黄绿">🟢 黄绿</option>
              <option value="墨绿">🟩 墨绿</option>
              <option value="棕色">🟤 棕色</option>
              <option value="灰白">⚪ 灰白 (需关注)</option>
              <option value="黑色">⚫ 黑色 (需关注)</option>
            </select>
          </div>
        )}
        <div className="form-row">
          <label>备注</label>
          <input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="例如: 量多" />
        </div>
        <button type="submit" className="btn btn-primary btn-full">保存</button>
      </form>
    </Card>
  );
}

function CalendarView({ data, birthDate, selectedDate, onSelectDate }) {
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());

  const allRecords = [...data.feeding, ...data.sleep, ...data.diaper];
  const daysWithData = new Set(allRecords.map(r => r.date));

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div>
      <div className="date-nav">
        <button className="btn-sm" onClick={prevMonth}>◀</button>
        <h2>{viewYear}年{viewMonth + 1}月</h2>
        <button className="btn-sm" onClick={nextMonth}>▶</button>
      </div>
      <div className="calendar-grid">
        {weekDays.map(d => <div key={d} className="cal-header">{d}</div>)}
        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} className="cal-day empty" />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const hasData = daysWithData.has(dateStr);
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === today();
          const isBirth = dateStr === birthDate;
          return (
            <div
              key={day}
              className={`cal-day ${hasData ? 'has-data' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'is-today' : ''} ${isBirth ? 'is-birth' : ''}`}
              onClick={() => onSelectDate(dateStr)}
            >
              <span className="cal-day-num">{day}</span>
              {hasData && <span className="cal-dot">●</span>}
              {isBirth && <span className="cal-birth">🎂</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GrowthView({ records, addRecord, delRecord }) {
  const [showForm, setShowForm] = useState(false);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [head, setHead] = useState('');
  const [recordDate, setRecordDate] = useState(today());

  const sorted = [...records].sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleAdd = (e) => {
    e.preventDefault();
    addRecord('growth', {
      date: recordDate,
      weight: Number(weight) || 0,
      height: Number(height) || 0,
      headCircumference: Number(head) || 0,
    });
    setShowForm(false);
    setWeight('');
    setHeight('');
    setHead('');
  };

  const hasWeight = sorted.filter(r => r.weight > 0).length > 0;
  const hasHeight = sorted.filter(r => r.height > 0).length > 0;

  return (
    <div>
      <div className="section-header">
        <h2>📊 生长发育</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '取消' : '+ 记录'}
        </button>
      </div>

      {showForm && (
        <Card className="form-card">
          <form onSubmit={handleAdd}>
            <div className="form-row">
              <label>日期</label>
              <input type="date" value={recordDate} onChange={e => setRecordDate(e.target.value)} max={today()} />
            </div>
            <div className="form-row">
              <label>体重 (kg)</label>
              <input type="number" step="0.01" value={weight} onChange={e => setWeight(e.target.value)} placeholder="例如: 5.5" />
            </div>
            <div className="form-row">
              <label>身高 (cm)</label>
              <input type="number" step="0.1" value={height} onChange={e => setHeight(e.target.value)} placeholder="例如: 60" />
            </div>
            <div className="form-row">
              <label>头围 (cm)</label>
              <input type="number" step="0.1" value={head} onChange={e => setHead(e.target.value)} placeholder="例如: 40" />
            </div>
            <button type="submit" className="btn btn-primary btn-full">保存</button>
          </form>
        </Card>
      )}

      {hasWeight && (
        <Card className="chart-card">
          <h3>体重趋势 (kg)</h3>
          <div className="mini-chart">
            {sorted.filter(r => r.weight > 0).map((r, i, arr) => {
              const maxW = Math.max(...arr.map(x => x.weight));
              const minW = Math.min(...arr.map(x => x.weight));
              const range = maxW - minW || 1;
              const pct = ((r.weight - minW) / range) * 100;
              return (
                <div key={r.id} className="chart-bar-group">
                  <div className="chart-bar" style={{ height: `${Math.max(pct, 5)}%` }} title={`${r.weight}kg`}>
                    <span className="chart-val">{r.weight}</span>
                  </div>
                  <span className="chart-label">{r.date.slice(5)}</span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {hasHeight && (
        <Card className="chart-card">
          <h3>身高趋势 (cm)</h3>
          <div className="mini-chart">
            {sorted.filter(r => r.height > 0).map((r, i, arr) => {
              const maxH = Math.max(...arr.map(x => x.height));
              const minH = Math.min(...arr.map(x => x.height));
              const range = maxH - minH || 1;
              const pct = ((r.height - minH) / range) * 100;
              return (
                <div key={r.id} className="chart-bar-group">
                  <div className="chart-bar height-bar" style={{ height: `${Math.max(pct, 5)}%` }} title={`${r.height}cm`}>
                    <span className="chart-val">{r.height}</span>
                  </div>
                  <span className="chart-label">{r.date.slice(5)}</span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {sorted.length > 0 && (
        <div className="growth-table">
          <h3>历史记录</h3>
          <table>
            <thead>
              <tr>
                <th>日期</th>
                <th>体重(kg)</th>
                <th>身高(cm)</th>
                <th>头围(cm)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(r => (
                <tr key={r.id}>
                  <td>{r.date}</td>
                  <td>{r.weight || '--'}</td>
                  <td>{r.height || '--'}</td>
                  <td>{r.headCircumference || '--'}</td>
                  <td><button className="btn-del" onClick={() => delRecord('growth', r.id)}>✕</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {sorted.length === 0 && !showForm && (
        <p className="empty-tip">还没有生长记录，点击"+ 记录"添加</p>
      )}
    </div>
  );
}

function GuideView({ monthIdx }) {
  const [selectedMonth, setSelectedMonth] = useState(monthIdx);
  const schedule = MONTH_SCHEDULES[selectedMonth];

  return (
    <div>
      <h2>📖 月龄养育指南</h2>
      <div className="month-tabs">
        {Object.entries(MONTH_SCHEDULES).map(([m, info]) => (
          <button
            key={m}
            className={`month-tab ${Number(m) === selectedMonth ? 'active' : ''}`}
            onClick={() => setSelectedMonth(Number(m))}
          >
            {info.title}
          </button>
        ))}
      </div>

      {schedule && (
        <Card>
          <h3>{schedule.title}</h3>
          <p className="guide-desc">{schedule.desc}</p>
          <div className="schedule-list">
            {schedule.schedule.map((item, i) => (
              <div key={i} className="schedule-item">
                <span className="schedule-time">{item.time}</span>
                <span className="schedule-icon">{item.icon}</span>
                <span className="schedule-activity">{item.activity}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="guide-tips">
        <h3>💡 本月养育要点</h3>
        <MilestoneTips month={selectedMonth} />
      </div>
    </div>
  );
}

function MilestoneTips({ month }) {
  const tips = {
    0: [
      '按需喂养，不要严格卡时间',
      '注意观察黄疸消退情况',
      '脐带护理，保持干燥',
      '每天补充维生素D 400IU',
      '多趴练习，每次1-2分钟',
      '黑白卡追视练习',
    ],
    1: [
      '开始建立昼夜节律',
      '俯卧时间增加到每天15-20分钟',
      '练习追视和追听',
      '回应宝宝的发声，多说话',
      '肠胀气高发期，做排气操',
      '注意头型，交替睡姿方向',
    ],
    2: [
      '逐渐形成吃-玩-睡规律',
      '俯卧抬头可达45度',
      '开始抓握玩具',
      '多和宝宝说话、唱歌',
      '户外活动30分钟/天',
      '注意湿疹和口水疹护理',
    ],
    3: [
      '睡眠倒退期，耐心陪伴',
      '练习翻身（仰卧→侧卧）',
      '伸手抓物，提供不同材质玩具',
      '开始认生，多给予安全感',
      '流口水增多，准备牙胶',
      '继续坚持俯卧练习',
    ],
    4: [
      '开始添加辅食（高铁米粉优先）',
      '每次只添加一种新食物，观察3天',
      '练习坐立（靠坐→扶坐）',
      '出牙期，提供磨牙棒',
      '开始模仿发音（baba/mama）',
      '注意排查过敏食物',
    ],
    5: [
      '辅食加到2顿，种类多样化',
      '练习独坐和爬行准备',
      '可以开始用吸管杯喝水',
      '亲子阅读绘本时间',
      '夜间睡眠可持续6-8小时',
      '注意安全，防止跌落',
    ],
  };

  return (
    <ul className="tips-list">
      {(tips[month] || tips[0]).map((tip, i) => (
        <li key={i}>{tip}</li>
      ))}
    </ul>
  );
}
