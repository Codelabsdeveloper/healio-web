'use client';

import { useRef, useState, useMemo } from 'react';
import {
  FileText,
  Upload,
  X,
  FileImage,
  File,
  FlaskConical,
  Stethoscope,
  Image as ImageIcon,
  Activity,
  Receipt,
  Users,
  Search,
  SlidersHorizontal,
  LayoutList,
  LayoutGrid,
  ChevronRight,
  Bookmark,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';

const SIDEBAR_CATEGORIES = [
  { id: 'all', label: 'All Reports', icon: FileText },
  { id: 'lab', label: 'Lab Reports', icon: FlaskConical },
  { id: 'prescription', label: 'Prescriptions', icon: FileText },
  { id: 'medical-images', label: 'Medical Images', icon: ImageIcon },
  { id: 'ecg', label: 'ECG Reports', icon: Activity },
  { id: 'bills', label: 'Medical Bills', icon: Receipt },
  { id: 'consultations', label: 'Consultations', icon: Stethoscope },
] as const;

type CategoryId = (typeof SIDEBAR_CATEGORIES)[number]['id'];

const ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
];
const ACCEPTED_EXT = '.jpg,.jpeg,.png,.webp,.gif,.pdf';

interface ReportItem {
  id: string;
  title: string;
  category: CategoryId;
  date: string;
  type: 'pdf' | 'image';
  size?: string;
  isUpload?: boolean;
  isShared?: boolean;
}

const DUMMY_REPORTS: ReportItem[] = [
  { id: 'd1', title: 'CBC & Lipid Panel', category: 'lab', date: '2025-01-15', type: 'pdf' },
  { id: 'd2', title: 'Diabetes Screening Report', category: 'lab', date: '2025-01-10', type: 'pdf', isShared: true },
  { id: 'd3', title: 'Dr. Sharma - Follow-up', category: 'prescription', date: '2025-01-12', type: 'pdf' },
  { id: 'd4', title: 'X-Ray Chest PA', category: 'medical-images', date: '2025-01-08', type: 'image', isShared: true },
  { id: 'd5', title: 'ECG Resting', category: 'ecg', date: '2025-01-05', type: 'pdf' },
  { id: 'd6', title: 'Apollo Pharmacy Bill', category: 'bills', date: '2025-01-18', type: 'pdf' },
  { id: 'd7', title: 'Consultation - Cardiology', category: 'consultations', date: '2025-01-14', type: 'pdf', isShared: true },
  { id: 'd8', title: 'Thyroid Function Test', category: 'lab', date: '2024-12-20', type: 'pdf' },
];

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  category: string;
  uploadedAt: Date;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getCategoryCount(categoryId: CategoryId, reports: ReportItem[]): number {
  if (categoryId === 'all') return reports.length;
  return reports.filter((r) => r.category === categoryId).length;
}

export default function HealthRecordsPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'uploads'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterByShared, setFilterByShared] = useState(false);
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [uploads, setUploads] = useState<UploadedFile[]>([]);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const [uploadError, setUploadError] = useState<string | null>(null);

  const categoryFromUpload: (label: string) => CategoryId = (label) => {
    const key = label.toLowerCase().replace(/\s+/g, '-');
    const map: Record<string, CategoryId> = {
      'lab-reports': 'lab', lab: 'lab',
      'prescriptions': 'prescription', prescription: 'prescription',
      'medical-images': 'medical-images',
      'ecg-reports': 'ecg', ecg: 'ecg',
      'medical-bills': 'bills', bills: 'bills',
      'consultations': 'consultations', consultation: 'consultations',
    };
    return map[key] ?? 'lab';
  };

  const uploadsAsReports: ReportItem[] = useMemo(
    () =>
      uploads.map((u) => ({
        id: u.id,
        title: u.name,
        category: categoryFromUpload(u.category),
        date: u.uploadedAt.toISOString().slice(0, 10),
        type: u.type === 'application/pdf' ? 'pdf' : 'image',
        size: formatSize(u.size),
        isUpload: true,
      })),
    [uploads]
  );

  const allReports = useMemo(
    () => [...DUMMY_REPORTS, ...uploadsAsReports],
    [uploadsAsReports]
  );

  const filteredReports = useMemo(() => {
    let list = activeTab === 'uploads' ? uploadsAsReports : allReports;
    if (selectedCategory !== 'all') {
      list = list.filter((r) => r.category === selectedCategory);
    }
    if (filterByShared) {
      list = list.filter((r) => r.isShared === true);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((r) => r.title.toLowerCase().includes(q));
    }
    return list.sort((a, b) => (b.date > a.date ? 1 : -1));
  }, [allReports, uploadsAsReports, activeTab, selectedCategory, filterByShared, searchQuery]);

  const bookmarkedReports = useMemo(
    () => allReports.filter((r) => bookmarkedIds.has(r.id)),
    [allReports, bookmarkedIds]
  );

  const triggerFileInput = () => {
    setUploadError(null);
    inputRef.current?.click();
  };

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) return `Use ${ACCEPTED_EXT}`;
    if (file.size > 10 * 1024 * 1024) return 'Max 10 MB';
    return null;
  };

  const addFiles = (files: FileList | null) => {
    if (!files?.length) return;
    setUploadError(null);
    const next: UploadedFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const err = validateFile(file);
      if (err) {
        setUploadError(err);
        continue;
      }
      next.push({
        id: `upload-${Date.now()}-${i}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        category: 'Lab Reports',
        uploadedAt: new Date(),
      });
    }
    if (next.length) setUploads((prev) => [...prev, ...next]);
  };

  const removeUpload = (id: string) => {
    setUploads((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXT}
        multiple
        className="hidden"
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = '';
        }}
        aria-label="Choose files to upload"
      />

      {/* Left sidebar - My Reports + categories */}
      <aside className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white p-4 relative z-10">
        <h2 className="font-bold text-lg text-dark mb-4">My Reports</h2>
        <nav className="space-y-0.5" aria-label="Report categories">
          {SIDEBAR_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const count = getCategoryCount(cat.id, allReports);
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedCategory(cat.id);
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition cursor-pointer touch-manipulation min-h-[44px]',
                  isSelected
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                )}
                aria-pressed={isSelected}
                aria-label={`${cat.label}, ${count} files`}
              >
                <Icon className="w-5 h-5 shrink-0 pointer-events-none" aria-hidden />
                <span className="flex-1 font-medium text-sm pointer-events-none">{cat.label}</span>
                {/* <span className="text-xs opacity-80 pointer-events-none">{count} Files</span> */}
                <ChevronRight className="w-4 h-4 shrink-0 opacity-70 pointer-events-none" aria-hidden />
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 p-4 sm:p-6">
        {/* <h1 className="text-xl font-bold text-dark mb-4">{currentCategoryLabel}</h1> */}

        {/* Action bar: Search, Filter, Shared, Bookmark, + Add Report (right) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[160px] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            {/* <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowFilters((v) => !v);
              }}
              className={cn(
                'inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm cursor-pointer touch-manipulation min-h-[44px]',
                showFilters ? 'border-primary bg-primary-50 text-primary' : 'border-gray-200 hover:bg-gray-50'
              )}
              aria-label="Toggle filters"
              aria-expanded={showFilters}
            >
              <SlidersHorizontal className="w-4 h-4 pointer-events-none" aria-hidden />
              <span className="pointer-events-none">Filter</span>
            </button> */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFilterByShared((v) => !v);
              }}
              className={cn(
                'inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm cursor-pointer touch-manipulation min-h-[44px]',
                filterByShared ? 'border-primary bg-primary-50 text-primary' : 'border-gray-200 hover:bg-gray-50'
              )}
              aria-label={filterByShared ? 'Show all reports' : 'Filter by shared reports'}
              aria-pressed={filterByShared}
            >
              <Users className="w-4 h-4 pointer-events-none" aria-hidden />
              <span className="pointer-events-none">Shared Reports</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowBookmarkModal(true);
              }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm cursor-pointer touch-manipulation min-h-[44px]"
              aria-label="Bookmarked reports"
            >
              <Bookmark className="w-4 h-4 pointer-events-none" aria-hidden />
              <span className="pointer-events-none">Bookmark</span>
            </button>
          </div>
          <Button
            onClick={triggerFileInput}
            className="shrink-0 inline-flex items-center gap-2 bg-secondary hover:opacity-90 text-white"
          >
            <Upload className="w-4 h-4" />
            Add Report
          </Button>
        </div>

        {uploadError && (
          <p className="text-sm text-red-500 mb-2" role="alert">
            {uploadError}
          </p>
        )}

        {/* Tabs: All | Uploads */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={cn(
              'pb-3 text-sm font-medium border-b-2 transition',
              activeTab === 'all'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('uploads')}
            className={cn(
              'pb-3 text-sm font-medium border-b-2 transition',
              activeTab === 'uploads'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
            Uploads
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2 pb-3">
            <span className="text-xs text-gray-500">Sort</span>
            <div className="flex rounded-lg border border-gray-200 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-1.5 rounded',
                  viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'
                )}
                aria-label="List view"
              >
                <LayoutList className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-1.5 rounded',
                  viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {filterByShared && (
          <div className="mb-4 flex flex-wrap items-center gap-2 p-3 bg-primary-50 rounded-xl border border-primary-100 text-sm">
            <span className="text-primary font-medium">Showing shared reports only.</span>
            <button
              type="button"
              onClick={() => setFilterByShared(false)}
              className="text-primary hover:underline font-medium"
            >
              Show all
            </button>
          </div>
        )}

        {/* Report cards - list or grid */}
        {filteredReports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-2xl border border-gray-100">
            <FileText className="w-16 h-16 text-gray-300 mb-4" />
            {filterByShared ? (
              <>
                <p className="text-sm text-gray-500 mb-4 text-center">
                  No shared reports in this view. Try another category or turn off the Shared Reports filter.
                </p>
                <Button variant="outline" onClick={() => setFilterByShared(false)}>
                  Show all reports
                </Button>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-4 text-center">
                  Click &quot;Add Report&quot; to upload prescriptions, lab reports, or images.
                </p>
                <Button onClick={triggerFileInput} className="inline-flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Add Report
                </Button>
              </>
            )}
          </div>
        ) : viewMode === 'list' ? (
          <ul className="space-y-2">
            {filteredReports.map((report) => (
              <li
                key={report.id}
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  if ((e.target as HTMLElement).closest('button')) return;
                  setSelectedReport(report);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedReport(report);
                  }
                }}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer touch-manipulation min-h-[44px]"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 pointer-events-none">
                  {report.type === 'pdf' ? (
                    <File className="w-5 h-5 text-primary" />
                  ) : (
                    <FileImage className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div className="min-w-0 flex-1 pointer-events-none">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-dark truncate">{report.title}</p>
                    {report.isShared && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium shrink-0" title="Shared report">
                        <Users className="w-3.5 h-3.5" />
                        Shared
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {report.date}
                    {report.size && ` · ${report.size}`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => toggleBookmark(report.id, e)}
                  className={cn(
                    'p-2 rounded-lg shrink-0 transition',
                    bookmarkedIds.has(report.id)
                      ? 'text-primary bg-primary/10 hover:bg-primary/20'
                      : 'text-gray-400 hover:text-primary hover:bg-gray-100'
                  )}
                  aria-label={bookmarkedIds.has(report.id) ? 'Remove bookmark' : 'Bookmark report'}
                >
                  <Bookmark
                    className={cn('w-5 h-5', bookmarkedIds.has(report.id) && 'fill-current')}
                  />
                </button>
                {report.isUpload && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeUpload(report.id);
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 shrink-0"
                    aria-label="Remove"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  if ((e.target as HTMLElement).closest('button')) return;
                  setSelectedReport(report);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedReport(report);
                  }
                }}
                className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col cursor-pointer touch-manipulation min-h-[44px] relative"
              >
                <button
                  type="button"
                  onClick={(e) => toggleBookmark(report.id, e)}
                  className={cn(
                    'absolute top-3 right-3 p-1.5 rounded-lg shrink-0 transition',
                    bookmarkedIds.has(report.id)
                      ? 'text-primary bg-primary/10 hover:bg-primary/20'
                      : 'text-gray-400 hover:text-primary hover:bg-gray-100'
                  )}
                  aria-label={bookmarkedIds.has(report.id) ? 'Remove bookmark' : 'Bookmark report'}
                >
                  <Bookmark
                    className={cn('w-4 h-4', bookmarkedIds.has(report.id) && 'fill-current')}
                  />
                </button>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 pointer-events-none">
                  {report.type === 'pdf' ? (
                    <File className="w-6 h-6 text-primary" />
                  ) : (
                    <FileImage className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div className="pointer-events-none pr-8">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-medium text-dark truncate">{report.title}</p>
                    {report.isShared && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium shrink-0" title="Shared report">
                        <Users className="w-3.5 h-3.5" />
                        Shared
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{report.date}</p>
                </div>
                <div className="mt-auto flex items-center gap-2">
                  {report.isUpload && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeUpload(report.id);
                      }}
                      className="text-sm text-red-500 hover:underline text-left"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
            Filter options (date range, type) can be added here.
          </div>
        )}

        {/* View report modal */}
        {selectedReport && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelectedReport(null)}
              aria-hidden
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <div
                className="relative w-full max-w-lg bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-xl my-auto"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="view-report-title"
              >
                <button
                  type="button"
                  onClick={() => setSelectedReport(null)}
                  className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition z-10"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="p-4 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2 pr-10 mb-4">
                    <h3 id="view-report-title" className="font-bold text-lg">
                      {selectedReport.title}
                    </h3>
                    {selectedReport.isShared && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium" title="Shared report">
                        <Users className="w-4 h-4" />
                        Shared
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-4">
                    <span>{selectedReport.date}</span>
                    {selectedReport.size && <span> · {selectedReport.size}</span>}
                    <span> · {selectedReport.type === 'pdf' ? 'PDF' : 'Image'}</span>
                  </div>
                  <div className="min-h-[200px] bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center p-6 text-center text-gray-500 text-sm">
                    Report preview would open here. With a real file, you could view or download it.
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Button
                      variant="outline"
                      className="flex-1 inline-flex items-center justify-center gap-2"
                      onClick={(e) => toggleBookmark(selectedReport.id, e)}
                    >
                      <Bookmark
                        className={cn('w-4 h-4', bookmarkedIds.has(selectedReport.id) && 'fill-current')}
                      />
                      {bookmarkedIds.has(selectedReport.id) ? 'Remove bookmark' : 'Bookmark report'}
                    </Button>
                    <Button className="flex-1" onClick={() => setSelectedReport(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Bookmark modal */}
        {showBookmarkModal && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowBookmarkModal(false)}
              aria-hidden
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <div
                className="relative w-full max-w-md bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-xl my-auto"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="bookmark-modal-title"
              >
                <button
                  type="button"
                  onClick={() => setShowBookmarkModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition z-10"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="p-4 sm:p-6">
                  <h3 id="bookmark-modal-title" className="font-bold text-lg pr-10 mb-4">
                    Bookmarked reports
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Quick access to reports you’ve bookmarked.
                  </p>
                  {bookmarkedReports.length === 0 ? (
                    <div className="p-4 bg-gray-50 rounded-xl text-center text-gray-500 text-sm">
                      No bookmarked reports yet. Click the bookmark icon on any report to add it here.
                    </div>
                  ) : (
                    <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
                      {bookmarkedReports.map((report) => (
                        <li
                          key={report.id}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition"
                        >
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            {report.type === 'pdf' ? (
                              <File className="w-4 h-4 text-primary" />
                            ) : (
                              <FileImage className="w-4 h-4 text-primary" />
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setShowBookmarkModal(false);
                              setSelectedReport(report);
                            }}
                            className="flex-1 min-w-0 text-left"
                          >
                            <p className="font-medium text-dark truncate text-sm">{report.title}</p>
                            <p className="text-xs text-gray-500">{report.date}</p>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => toggleBookmark(report.id, e)}
                            className="p-2 text-primary hover:bg-primary/10 rounded-lg shrink-0"
                            aria-label="Remove bookmark"
                          >
                            <Bookmark className="w-4 h-4 fill-current" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button className="w-full mt-4" onClick={() => setShowBookmarkModal(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
