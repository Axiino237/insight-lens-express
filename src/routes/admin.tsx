import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState, useEffect, useRef } from "react";
import { resolveStallImage } from "@/data/stallImages";
import { resolveBrandLogoSrc } from "@/data/brandLogos";
import {
  CompletedWork,
  DEFAULT_COMPLETED_WORKS,
  resolveCompletedWorkImage,
  resolveWorkImages,
} from "@/data/completedWorks";
import {
  UpcomingExpo,
  DEFAULT_UPCOMING_EXPOS,
  EXPO_SECTOR_OPTIONS,
  EXPO_STATUS_OPTIONS,
} from "@/data/upcomingExpos";
import {
  StallComparisonConfig,
  DEFAULT_STALL_COMPARISON,
  resolveComparisonRender,
  resolveComparisonExecuted,
} from "@/data/stallComparison";
import stallFabricationWork from "@/assets/stall-fabrication.jpg";
import stall02 from "@/assets/stall/IMG-20240419-WA0083.jpg";
import {
  Star,
  Trash2,
  Plus,
  Pencil,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Upload,
  X,
  RotateCcw,
  Lock,
  ShieldCheck,
  LogOut,
  Eye,
  EyeOff,
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutTemplate,
  Award,
  Layers,
  MapPin,
  Calendar,
  Clock,
  Maximize2,
  Building2,
  CalendarDays,
  ArrowLeftRight,
  Box,
  Images,
} from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  stars: number;
  companyName?: string;
  photo?: string;
  message: string;
  createdAt?: string;
}

interface ShowcaseItem {
  id: string;
  name: string;
  classification: string;
  image: string;
  description?: string;
  createdAt?: string;
}

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  badge: string;
  desc: string;
  footprint: string;
  structure: string;
  format: string;
  image: string;
  accent: string;
  createdAt?: string;
}

interface BrandItem {
  id: string;
  image: string;
  createdAt?: string;
}

const CLASSIFICATION_OPTIONS = [
  "Custom Fabrication",
  "Exhibition Stall",
  "Trade Show",
  "Expo Stall",
  "Modular Booth",
  "Brand Activation",
  "Corporate Pavilion",
];

const COMPLETED_WORK_STALL_TYPES = [
  "Island Pavilion",
  "Custom Fabrication",
  "Double-Decker",
  "Modular Booth",
  "3-Side Open",
  "Corporate Pavilion",
];

const ACCENT_OPTIONS = [
  { label: "Warm Orange & Magenta", value: "from-brand-orange to-brand-magenta" },
  { label: "Cool Cyan & Blue", value: "from-brand-cyan to-brand-blue" },
  { label: "Emerald Green & Cyan", value: "from-brand-green to-brand-cyan" },
  { label: "Amber Yellow & Orange", value: "from-brand-yellow to-brand-orange" },
];

function resolveHeroPreview(slide?: { id?: string; image?: string } | null, imageString?: string) {
  const img = imageString || slide?.image || "";
  if (img.startsWith("data:") || img.startsWith("http://") || img.startsWith("https://")) {
    return img;
  }
  if (slide?.id === "slide_1" || img === "default_hero_1" || img.includes("stall-fabrication")) {
    return stallFabricationWork;
  }
  if (slide?.id === "slide_2" || img === "default_hero_2" || img.includes("IMG-20240419-WA0083")) {
    return stall02;
  }
  return img || stallFabricationWork;
}

function AdminWorkCardPreview({
  work,
  index,
  isEditing,
}: {
  work: CompletedWork;
  index: number;
  isEditing: boolean;
}) {
  const images = resolveWorkImages(work, index);
  const [currentIdx, setCurrentIdx] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60 group/adminimg">
      <img
        src={images[currentIdx] || images[0]}
        alt={work.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-black/75 backdrop-blur text-brand-orange border border-brand-orange/30">
          {work.stallType}
        </span>
        {images.length > 1 && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/75 backdrop-blur text-brand-yellow border border-brand-yellow/30">
            <Images size={10} />
            <span>
              {currentIdx + 1}/{images.length}
            </span>
          </span>
        )}
      </div>

      {isEditing && (
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-orange text-white">
            Editing
          </span>
        </div>
      )}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-7 w-7 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover/adminimg:opacity-100 transition cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-7 w-7 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover/adminimg:opacity-100 transition cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight size={14} />
          </button>

          <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1 z-10">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all ${
                  currentIdx === i ? "w-3 bg-brand-orange" : "w-1 bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — The First Step Solutions" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => (
    <Layout hideHeader hideChat hideFooter>
      <AdminDashboard />
    </Layout>
  ),
});

function AdminDashboard() {
  // Authentication State (defaults: admin / admin123 or admin / admin)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("tfss_admin_auth") === "true";
    }
    return false;
  });
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [activeTab, setActiveTab] = useState<
    | "testimonials"
    | "showcase"
    | "hero"
    | "brands"
    | "completed-works"
    | "upcoming-expos"
    | "comparison"
  >("testimonials");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showcaseItems, setShowcaseItems] = useState<ShowcaseItem[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [completedWorks, setCompletedWorks] = useState<CompletedWork[]>(DEFAULT_COMPLETED_WORKS);
  const [upcomingExpos, setUpcomingExpos] = useState<UpcomingExpo[]>(DEFAULT_UPCOMING_EXPOS);
  const [mobileShowForm, setMobileShowForm] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const navScrollRef = useRef<HTMLElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateNavScrollState = () => {
    const el = navScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateNavScrollState();
    window.addEventListener("resize", updateNavScrollState);
    return () => window.removeEventListener("resize", updateNavScrollState);
  }, [isAuthenticated, testimonials.length, showcaseItems.length, heroSlides.length, brands.length, completedWorks.length, upcomingExpos.length]);

  const scrollNavBy = (delta: number) => {
    const el = navScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  // Testimonials Form & Editing State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [stars, setStars] = useState(5);
  const [companyName, setCompanyName] = useState("");
  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Showcase Form & Editing State
  const [editingShowcaseId, setEditingShowcaseId] = useState<string | null>(null);
  const [showcaseName, setShowcaseName] = useState("");
  const [showcaseClassification, setShowcaseClassification] = useState(CLASSIFICATION_OPTIONS[0]);
  const [showcaseImage, setShowcaseImage] = useState("");
  const [showcaseSubmitting, setShowcaseSubmitting] = useState(false);
  const showcaseFileInputRef = useRef<HTMLInputElement>(null);

  // Hero Carousel Form & Editing State
  const [editingHeroId, setEditingHeroId] = useState<string | null>(null);
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroTag, setHeroTag] = useState("");
  const [heroBadge, setHeroBadge] = useState("");
  const [heroDesc, setHeroDesc] = useState("");
  const [heroFootprint, setHeroFootprint] = useState("");
  const [heroStructure, setHeroStructure] = useState("");
  const [heroFormat, setHeroFormat] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [heroAccent, setHeroAccent] = useState(ACCENT_OPTIONS[0].value);
  const [heroSubmitting, setHeroSubmitting] = useState(false);
  const heroFileInputRef = useRef<HTMLInputElement>(null);

  // Brands Form & Editing State (Images only, no text needed)
  const [editingBrandId, setEditingBrandId] = useState<string | null>(null);
  const [brandImage, setBrandImage] = useState("");
  const [brandSubmitting, setBrandSubmitting] = useState(false);
  const brandFileInputRef = useRef<HTMLInputElement>(null);

  // Completed Works Form & Editing State
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);
  const [workName, setWorkName] = useState("");
  const [workClient, setWorkClient] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [workDate, setWorkDate] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [workSize, setWorkSize] = useState("");
  const [workStallType, setWorkStallType] = useState(COMPLETED_WORK_STALL_TYPES[0]);
  const [workImage, setWorkImage] = useState("");
  const [workImages, setWorkImages] = useState<string[]>([]);
  const [workDescription, setWorkDescription] = useState("");
  const [workSubmitting, setWorkSubmitting] = useState(false);
  const workFileInputRef = useRef<HTMLInputElement>(null);

  // Upcoming Expos Form & Editing State
  const [editingExpoId, setEditingExpoId] = useState<string | null>(null);
  const [expoName, setExpoName] = useState("");
  const [expoSector, setExpoSector] = useState(EXPO_SECTOR_OPTIONS[0]);
  const [expoDate, setExpoDate] = useState("");
  const [expoTime, setExpoTime] = useState("");
  const [expoPlace, setExpoPlace] = useState("");
  const [expoCity, setExpoCity] = useState("");
  const [expoStatus, setExpoStatus] = useState(EXPO_STATUS_OPTIONS[0]);
  const [expoEdition, setExpoEdition] = useState("");
  const [expoWebsiteUrl, setExpoWebsiteUrl] = useState("");
  const [expoSubmitting, setExpoSubmitting] = useState(false);

  // 3D vs Reality (Stall Comparison) State
  const [comparison, setComparison] = useState<StallComparisonConfig>(DEFAULT_STALL_COMPARISON);
  const [compTitle, setCompTitle] = useState("");
  const [compSubtitle, setCompSubtitle] = useState("");
  const [compClient, setCompClient] = useState("");
  const [compVenue, setCompVenue] = useState("");
  const [compRenderImage, setCompRenderImage] = useState("");
  const [compExecutedImage, setCompExecutedImage] = useState("");
  const [compSubmitting, setCompSubmitting] = useState(false);
  const renderFileInputRef = useRef<HTMLInputElement>(null);
  const executedFileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const u = loginUsername.trim().toLowerCase();
    const p = loginPassword.trim();

    // Default credentials: admin / admin123 (or admin / admin)
    if (u === "admin" && (p === "admin123" || p === "admin")) {
      sessionStorage.setItem("tfss_admin_auth", "true");
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password. Please use default credentials: admin / admin123");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("tfss_admin_auth");
    setIsAuthenticated(false);
    setLoginUsername("");
    setLoginPassword("");
  };

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      }
    } catch (err) {
      console.error("Error fetching testimonials", err);
    }
  };

  const fetchShowcaseItems = async () => {
    try {
      const res = await fetch("/api/showcase");
      if (res.ok) {
        const data = await res.json();
        setShowcaseItems(data);
      }
    } catch (err) {
      console.error("Error fetching showcase items", err);
    }
  };

  const fetchHeroSlides = async () => {
    try {
      const res = await fetch("/api/hero-slides");
      if (res.ok) {
        const data = await res.json();
        setHeroSlides(data);
      }
    } catch (err) {
      console.error("Error fetching hero slides", err);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await fetch("/api/brands");
      if (res.ok) {
        const data = await res.json();
        setBrands(data);
      }
    } catch (err) {
      console.error("Error fetching brands", err);
    }
  };

  const fetchCompletedWorks = async () => {
    try {
      const res = await fetch("/api/completed-works");
      if (res.ok) {
        const data = await res.json();
        setCompletedWorks(data);
      }
    } catch (err) {
      console.error("Error fetching completed works", err);
    }
  };

  const fetchUpcomingExpos = async () => {
    try {
      const res = await fetch("/api/upcoming-expos");
      if (res.ok) {
        const data = await res.json();
        setUpcomingExpos(data);
      }
    } catch (err) {
      console.error("Error fetching upcoming expos", err);
    }
  };

  const fetchComparison = async () => {
    try {
      const res = await fetch("/api/stall-comparison");
      if (res.ok) {
        const data = await res.json();
        setComparison(data);
        setCompTitle(data.title || "");
        setCompSubtitle(data.subtitle || "");
        setCompClient(data.client || "");
        setCompVenue(data.venue || "");
        setCompRenderImage(resolveComparisonRender(data.renderImage));
        setCompExecutedImage(resolveComparisonExecuted(data.executedImage));
      }
    } catch (err) {
      console.error("Error fetching comparison data", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTestimonials();
      fetchShowcaseItems();
      fetchHeroSlides();
      fetchBrands();
      fetchCompletedWorks();
      fetchUpcomingExpos();
      fetchComparison();
    }
  }, [isAuthenticated]);

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFeedback({ type: "error", text: "Please select an image file (JPEG, PNG, WEBP, etc.)." });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_DIM = 400; // Optimal 400px circular avatar size
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
        setPhoto(dataUrl);
        setFeedback(null);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleStartEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setName(t.name);
    setStars(t.stars || 5);
    setCompanyName(t.companyName || "");
    setPhoto(t.photo || "");
    setMessage(t.message);
    setMobileShowForm(true);
    setFeedback({
      type: "success",
      text: `Editing testimonial by "${t.name}". Update the fields below and save.`,
    });
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
    setStars(5);
    setCompanyName("");
    setPhoto("");
    setMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setFeedback({ type: "error", text: "Please fill in all required fields (Name and Message)." });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    const payload = {
      name: name.trim(),
      stars: Number(stars),
      companyName: companyName.trim() || undefined,
      photo: photo.trim() || undefined,
      message: message.trim(),
    };

    try {
      if (editingId) {
        // UPDATE existing testimonial
        const res = await fetch(`/api/testimonials/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to update testimonial");
        }

        setFeedback({ type: "success", text: `Testimonial by "${name.trim()}" successfully updated!` });
      } else {
        // CREATE new testimonial
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to add testimonial");
        }

        setFeedback({ type: "success", text: "Testimonial successfully added!" });
      }

      handleCancelEdit();
      await fetchTestimonials();
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message || "Failed to save testimonial" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        if (editingId === id) {
          handleCancelEdit();
        }
        setFeedback({ type: "success", text: "Testimonial deleted successfully." });
      }
    } catch (err) {
      console.error("Error deleting testimonial", err);
    }
  };

  // ── SHOWCASE HANDLERS ──────────────────────────────────────────────────
  const handleShowcaseImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFeedback({ type: "error", text: "Please select an image file (JPEG, PNG, WEBP, etc.)." });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_DIM = 1200; // Optimal 1200px max dimension
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
        setShowcaseImage(dataUrl);
        setFeedback(null);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveShowcase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showcaseName.trim()) {
      setFeedback({ type: "error", text: "Please enter the item name." });
      return;
    }
    if (!showcaseClassification.trim()) {
      setFeedback({ type: "error", text: "Please select a classification." });
      return;
    }
    if (!showcaseImage) {
      setFeedback({ type: "error", text: "Please choose an image for this showcase item." });
      return;
    }

    setShowcaseSubmitting(true);
    try {
      const payload = {
        name: showcaseName.trim(),
        classification: showcaseClassification.trim(),
        image: showcaseImage,
      };

      if (editingShowcaseId) {
        const res = await fetch(`/api/showcase/${editingShowcaseId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setFeedback({
            type: "success",
            text: `Showcase item "${showcaseName.trim()}" updated successfully!`,
          });
          handleCancelShowcaseEdit();
          await fetchShowcaseItems();
        } else {
          setFeedback({ type: "error", text: "Failed to update showcase item." });
        }
      } else {
        const res = await fetch("/api/showcase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setFeedback({
            type: "success",
            text: `Showcase item "${showcaseName.trim()}" successfully added!`,
          });
          handleCancelShowcaseEdit();
          await fetchShowcaseItems();
        } else {
          setFeedback({ type: "error", text: "Failed to add showcase item." });
        }
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Network error saving showcase item." });
    } finally {
      setShowcaseSubmitting(false);
    }
  };

  const handleStartShowcaseEdit = (item: ShowcaseItem) => {
    setEditingShowcaseId(item.id);
    setShowcaseName(item.name);
    setShowcaseClassification(item.classification);
    setShowcaseImage(item.image);
    setMobileShowForm(true);
    setFeedback({
      type: "success",
      text: `Editing "${item.name}". Update the fields and click Save.`,
    });
    window.scrollTo({ top: 80, behavior: "smooth" });
  };

  const handleCancelShowcaseEdit = () => {
    setEditingShowcaseId(null);
    setShowcaseName("");
    setShowcaseClassification(CLASSIFICATION_OPTIONS[0]);
    setShowcaseImage("");
    if (showcaseFileInputRef.current) {
      showcaseFileInputRef.current.value = "";
    }
  };

  const handleDeleteShowcase = async (id: string, itemName: string) => {
    if (!confirm(`Are you sure you want to delete showcase item "${itemName}"?`)) return;

    try {
      const res = await fetch(`/api/showcase/${id}`, { method: "DELETE" });
      if (res.ok) {
        setShowcaseItems((prev) => prev.filter((item) => item.id !== id));
        if (editingShowcaseId === id) {
          handleCancelShowcaseEdit();
        }
        setFeedback({ type: "success", text: `Showcase item "${itemName}" deleted successfully.` });
      } else {
        setFeedback({ type: "error", text: "Failed to delete showcase item." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Network error deleting showcase item." });
    }
  };

  // ── HERO CAROUSEL HANDLERS ─────────────────────────────────────────────
  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFeedback({ type: "error", text: "Please select an image file (JPEG, PNG, WEBP, etc.)." });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_DIM = 1600; // Optimal 1600px max dimension for wide hero photo
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
        setHeroImage(dataUrl);
        setFeedback(null);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveHeroSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroTitle.trim()) {
      setFeedback({ type: "error", text: "Please enter the stall title." });
      return;
    }
    if (!heroImage) {
      setFeedback({ type: "error", text: "Please choose an image for this hero slide." });
      return;
    }

    setHeroSubmitting(true);
    try {
      const payload = {
        title: heroTitle.trim(),
        subtitle: heroSubtitle.trim() || "Turnkey 3D Exhibition Pavilion",
        tag: heroTag.trim() || "Exhibition Architecture",
        badge: heroBadge.trim() || "★ Flagship Fabrication",
        desc: heroDesc.trim(),
        footprint: heroFootprint.trim() || "12m × 8m",
        structure: heroStructure.trim() || "Modular Architecture",
        format: heroFormat.trim() || "Island Pavilion",
        image: heroImage,
        accent: heroAccent || "from-brand-orange to-brand-magenta",
      };

      if (editingHeroId) {
        const res = await fetch(`/api/hero-slides/${editingHeroId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setFeedback({
            type: "success",
            text: `Hero slide "${heroTitle.trim()}" updated successfully!`,
          });
          handleCancelHeroEdit();
          await fetchHeroSlides();
        } else {
          setFeedback({ type: "error", text: "Failed to update hero slide." });
        }
      } else {
        const res = await fetch("/api/hero-slides", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setFeedback({
            type: "success",
            text: `Hero slide "${heroTitle.trim()}" added to the home page carousel!`,
          });
          handleCancelHeroEdit();
          await fetchHeroSlides();
        } else {
          setFeedback({ type: "error", text: "Failed to add hero slide." });
        }
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Network error saving hero slide." });
    } finally {
      setHeroSubmitting(false);
    }
  };

  const handleStartHeroEdit = (slide: HeroSlide) => {
    setEditingHeroId(slide.id);
    setHeroTitle(slide.title);
    setHeroSubtitle(slide.subtitle || "");
    setHeroTag(slide.tag || "");
    setHeroBadge(slide.badge || "");
    setHeroDesc(slide.desc || "");
    setHeroFootprint(slide.footprint || "");
    setHeroStructure(slide.structure || "");
    setHeroFormat(slide.format || "");
    setHeroImage(slide.image || "");
    setHeroAccent(slide.accent || ACCENT_OPTIONS[0].value);
    setMobileShowForm(true);
    setFeedback({
      type: "success",
      text: `Editing hero slide "${slide.title}". Update the fields and click Save.`,
    });
    window.scrollTo({ top: 80, behavior: "smooth" });
  };

  const handleCancelHeroEdit = () => {
    setEditingHeroId(null);
    setHeroTitle("");
    setHeroSubtitle("");
    setHeroTag("");
    setHeroBadge("");
    setHeroDesc("");
    setHeroFootprint("");
    setHeroStructure("");
    setHeroFormat("");
    setHeroImage("");
    setHeroAccent(ACCENT_OPTIONS[0].value);
    if (heroFileInputRef.current) {
      heroFileInputRef.current.value = "";
    }
  };

  const handleDeleteHeroSlide = async (id: string, slideTitle: string) => {
    if (!confirm(`Are you sure you want to delete hero slide "${slideTitle}"?`)) return;

    try {
      const res = await fetch(`/api/hero-slides/${id}`, { method: "DELETE" });
      if (res.ok) {
        setHeroSlides((prev) => prev.filter((s) => s.id !== id));
        if (editingHeroId === id) {
          handleCancelHeroEdit();
        }
        setFeedback({ type: "success", text: `Hero slide "${slideTitle}" deleted successfully.` });
      } else {
        setFeedback({ type: "error", text: "Failed to delete hero slide." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Network error deleting hero slide." });
    }
  };

  // ── BRAND LOGOS HANDLERS ───────────────────────────────────────────────
  const handleBrandImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFeedback({ type: "error", text: "Please select an image file (PNG, SVG, JPEG, WEBP)." });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_DIM = 600; // Optimal 600px dimension for crisp brand logos
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        // PNG preserves transparency if present
        const dataUrl = canvas.toDataURL("image/png");
        setBrandImage(dataUrl);
        setFeedback(null);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandImage) {
      setFeedback({ type: "error", text: "Please choose or upload a brand logo image." });
      return;
    }

    setBrandSubmitting(true);
    try {
      const payload = {
        image: brandImage,
      };

      if (editingBrandId) {
        const res = await fetch(`/api/brands/${editingBrandId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          setBrands((prev) => prev.map((b) => (b.id === editingBrandId ? updated : b)));
          handleCancelBrandEdit();
          setFeedback({ type: "success", text: "Brand logo updated successfully!" });
        } else {
          setFeedback({ type: "error", text: "Failed to update brand logo." });
        }
      } else {
        const res = await fetch("/api/brands", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          setBrands((prev) => [created, ...prev]);
          handleCancelBrandEdit();
          setFeedback({ type: "success", text: "Brand logo added successfully!" });
        } else {
          setFeedback({ type: "error", text: "Failed to add brand logo." });
        }
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Network error saving brand logo." });
    } finally {
      setBrandSubmitting(false);
    }
  };

  const handleStartBrandEdit = (b: BrandItem, idx: number) => {
    setEditingBrandId(b.id);
    const resolvedSrc = resolveBrandLogoSrc(b, idx);
    setBrandImage(resolvedSrc);
    setMobileShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelBrandEdit = () => {
    setEditingBrandId(null);
    setBrandImage("");
    if (brandFileInputRef.current) {
      brandFileInputRef.current.value = "";
    }
  };

  const handleDeleteBrand = async (id: string, index: number) => {
    if (!confirm(`Are you sure you want to delete Brand Logo #${index + 1}?`)) return;

    try {
      const res = await fetch(`/api/brands/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBrands((prev) => prev.filter((b) => b.id !== id));
        if (editingBrandId === id) {
          handleCancelBrandEdit();
        }
        setFeedback({ type: "success", text: `Brand Logo #${index + 1} deleted successfully.` });
      } else {
        setFeedback({ type: "error", text: "Failed to delete brand logo." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Network error deleting brand logo." });
    }
  };

  // ── COMPLETED WORKS HANDLERS ──────────────────────────────────────────
  const handleWorkImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (validFiles.length === 0) {
      setFeedback({ type: "error", text: "Please select valid image files (JPEG, PNG, WEBP, etc.)." });
      return;
    }

    const processFile = (file: File): Promise<string> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const MAX_DIM = 1600;
            let width = img.width;
            let height = img.height;
            if (width > height) {
              if (width > MAX_DIM) {
                height = Math.round((height * MAX_DIM) / width);
                width = MAX_DIM;
              }
            } else {
              if (height > MAX_DIM) {
                width = Math.round((width * MAX_DIM) / height);
                height = MAX_DIM;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
            resolve(dataUrl);
          };
          img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    };

    try {
      const processed = await Promise.all(validFiles.map(processFile));
      setWorkImages((prev) => [...prev, ...processed]);
      setFeedback({
        type: "success",
        text: `Added ${processed.length} photo(s). Total: ${workImages.length + processed.length} photos for this stall.`,
      });
    } catch (err) {
      setFeedback({ type: "error", text: "Failed to process some images." });
    } finally {
      if (workFileInputRef.current) {
        workFileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveWorkImage = (indexToRemove: number) => {
    setWorkImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSetCoverWorkImage = (indexToCover: number) => {
    setWorkImages((prev) => {
      const target = prev[indexToCover];
      const rest = prev.filter((_, idx) => idx !== indexToCover);
      return [target, ...rest];
    });
  };

  const handleSaveCompletedWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workName.trim()) {
      setFeedback({ type: "error", text: "Please enter the stall or project name." });
      return;
    }
    if (!workClient.trim()) {
      setFeedback({ type: "error", text: "Please enter the client / brand name." });
      return;
    }
    if (!workPlace.trim()) {
      setFeedback({ type: "error", text: "Please enter the location / venue." });
      return;
    }
    if (!workDate.trim()) {
      setFeedback({ type: "error", text: "Please enter the date." });
      return;
    }
    if (!workTime.trim()) {
      setFeedback({ type: "error", text: "Please enter the time or duration (e.g. 4-Day Expo)." });
      return;
    }
    if (!workSize.trim()) {
      setFeedback({ type: "error", text: "Please enter the stall size / dimensions (e.g. 12m × 8m)." });
      return;
    }
    if (workImages.length === 0) {
      setFeedback({ type: "error", text: "Please upload at least one stall photo." });
      return;
    }

    setWorkSubmitting(true);
    try {
      const payload = {
        name: workName.trim(),
        client: workClient.trim(),
        place: workPlace.trim(),
        date: workDate.trim(),
        time: workTime.trim(),
        size: workSize.trim(),
        stallType: workStallType || COMPLETED_WORK_STALL_TYPES[0],
        image: workImages[0] || "",
        images: workImages,
        description: workDescription.trim(),
      };

      if (editingWorkId) {
        const res = await fetch(`/api/completed-works/${editingWorkId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          setCompletedWorks((prev) => prev.map((w) => (w.id === editingWorkId ? updated : w)));
          handleCancelWorkEdit();
          setFeedback({ type: "success", text: `Completed work "${updated.name}" updated successfully with ${workImages.length} photos!` });
        } else {
          setFeedback({ type: "error", text: "Failed to update completed work." });
        }
      } else {
        const res = await fetch("/api/completed-works", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          setCompletedWorks((prev) => [created, ...prev]);
          handleCancelWorkEdit();
          setFeedback({ type: "success", text: `Completed work "${created.name}" added successfully with ${workImages.length} photos!` });
        } else {
          setFeedback({ type: "error", text: "Failed to add completed work." });
        }
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Network error saving completed work." });
    } finally {
      setWorkSubmitting(false);
    }
  };

  const handleStartWorkEdit = (w: CompletedWork, idx: number) => {
    setEditingWorkId(w.id);
    setWorkName(w.name);
    setWorkClient(w.client);
    setWorkPlace(w.place);
    setWorkDate(w.date);
    setWorkTime(w.time);
    setWorkSize(w.size);
    setWorkStallType(w.stallType || COMPLETED_WORK_STALL_TYPES[0]);
    setWorkDescription(w.description || "");
    const resolvedImages = resolveWorkImages(w, idx);
    setWorkImages(resolvedImages);
    setMobileShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelWorkEdit = () => {
    setEditingWorkId(null);
    setWorkName("");
    setWorkClient("");
    setWorkPlace("");
    setWorkDate("");
    setWorkTime("");
    setWorkSize("");
    setWorkStallType(COMPLETED_WORK_STALL_TYPES[0]);
    setWorkDescription("");
    setWorkImage("");
    setWorkImages([]);
    if (workFileInputRef.current) {
      workFileInputRef.current.value = "";
    }
  };

  const handleDeleteWork = async (id: string, itemName: string) => {
    if (!confirm(`Are you sure you want to delete completed work "${itemName}"?`)) return;

    try {
      const res = await fetch(`/api/completed-works/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCompletedWorks((prev) => prev.filter((item) => item.id !== id));
        if (editingWorkId === id) {
          handleCancelWorkEdit();
        }
        setFeedback({ type: "success", text: `Completed work "${itemName}" deleted successfully.` });
      } else {
        setFeedback({ type: "error", text: "Failed to delete completed work." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Network error deleting completed work." });
    }
  };

  // ── UPCOMING EXPOS HANDLERS ───────────────────────────────────────────
  const handleSaveExpo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expoName.trim()) {
      setFeedback({ type: "error", text: "Please enter the expo name." });
      return;
    }
    if (!expoDate.trim()) {
      setFeedback({ type: "error", text: "Please enter the expo dates." });
      return;
    }
    if (!expoPlace.trim()) {
      setFeedback({ type: "error", text: "Please enter the venue / exhibition centre." });
      return;
    }
    if (!expoCity.trim()) {
      setFeedback({ type: "error", text: "Please enter the city." });
      return;
    }

    setExpoSubmitting(true);
    try {
      const payload = {
        name: expoName.trim(),
        sector: expoSector || EXPO_SECTOR_OPTIONS[0],
        date: expoDate.trim(),
        time: expoTime.trim() || "10:00 AM – 6:00 PM",
        place: expoPlace.trim(),
        city: expoCity.trim(),
        status: expoStatus || EXPO_STATUS_OPTIONS[0],
        edition: expoEdition.trim(),
        websiteUrl: expoWebsiteUrl.trim(),
      };

      if (editingExpoId) {
        const res = await fetch(`/api/upcoming-expos/${editingExpoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          setUpcomingExpos((prev) => prev.map((item) => (item.id === editingExpoId ? updated : item)));
          handleCancelExpoEdit();
          setFeedback({ type: "success", text: `Upcoming expo "${updated.name}" updated successfully!` });
        } else {
          setFeedback({ type: "error", text: "Failed to update upcoming expo." });
        }
      } else {
        const res = await fetch("/api/upcoming-expos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          setUpcomingExpos((prev) => [created, ...prev]);
          handleCancelExpoEdit();
          setFeedback({ type: "success", text: `Upcoming expo "${created.name}" added successfully!` });
        } else {
          setFeedback({ type: "error", text: "Failed to add upcoming expo." });
        }
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Network error saving upcoming expo." });
    } finally {
      setExpoSubmitting(false);
    }
  };

  const handleStartExpoEdit = (expo: UpcomingExpo) => {
    setEditingExpoId(expo.id);
    setExpoName(expo.name);
    setExpoSector(expo.sector || EXPO_SECTOR_OPTIONS[0]);
    setExpoDate(expo.date);
    setExpoTime(expo.time);
    setExpoPlace(expo.place);
    setExpoCity(expo.city);
    setExpoStatus(expo.status || EXPO_STATUS_OPTIONS[0]);
    setExpoEdition(expo.edition || "");
    setExpoWebsiteUrl(expo.websiteUrl || "");
    setMobileShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelExpoEdit = () => {
    setEditingExpoId(null);
    setExpoName("");
    setExpoSector(EXPO_SECTOR_OPTIONS[0]);
    setExpoDate("");
    setExpoTime("");
    setExpoPlace("");
    setExpoCity("");
    setExpoStatus(EXPO_STATUS_OPTIONS[0]);
    setExpoEdition("");
    setExpoWebsiteUrl("");
  };

  const handleDeleteExpo = async (id: string, itemName: string) => {
    if (!confirm(`Are you sure you want to delete upcoming expo "${itemName}"?`)) return;

    try {
      const res = await fetch(`/api/upcoming-expos/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUpcomingExpos((prev) => prev.filter((item) => item.id !== id));
        if (editingExpoId === id) {
          handleCancelExpoEdit();
        }
        setFeedback({ type: "success", text: `Upcoming expo "${itemName}" deleted successfully.` });
      } else {
        setFeedback({ type: "error", text: "Failed to delete upcoming expo." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Network error deleting upcoming expo." });
    }
  };

  // ── 3D VS REALITY (STALL COMPARISON) HANDLERS ─────────────────────────
  const handleRenderFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFeedback({ type: "error", text: "Please select an image file (JPEG, PNG, WEBP, etc.)." });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_DIM = 1600;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setCompRenderImage(dataUrl);
        setFeedback(null);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleExecutedFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFeedback({ type: "error", text: "Please select an image file (JPEG, PNG, WEBP, etc.)." });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_DIM = 1600;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setCompExecutedImage(dataUrl);
        setFeedback(null);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveComparison = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!compRenderImage) {
      setFeedback({ type: "error", text: "Please upload or select a 3D CAD Render image." });
      return;
    }
    if (!compExecutedImage) {
      setFeedback({ type: "error", text: "Please upload or select a Real Executed Stall photograph." });
      return;
    }

    setCompSubmitting(true);
    try {
      const payload = {
        title: compTitle.trim() || "Precision Engineering Expo Pavilion",
        subtitle: compSubtitle.trim() || "3D CAD Visualization vs. Physical On-Ground Fabrication",
        client: compClient.trim() || "Flagship Client Stall",
        venue: compVenue.trim() || "Chennai Trade Centre, Nandambakkam",
        renderImage: compRenderImage,
        executedImage: compExecutedImage,
      };

      const res = await fetch("/api/stall-comparison", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const updated = await res.json();
        setComparison(updated);
        setFeedback({ type: "success", text: "3D vs. Reality comparison slider updated successfully!" });
      } else {
        setFeedback({ type: "error", text: "Failed to update stall comparison." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Network error saving stall comparison." });
    } finally {
      setCompSubmitting(false);
    }
  };

  // ── UNATHENTICATED: SHOW LOGIN SCREEN ──────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] py-16 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md glass rounded-3xl p-8 sm:p-10 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-brand-orange/20 blur-3xl pointer-events-none" />

          {/* Header Icon */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="h-14 w-14 rounded-2xl bg-gradient-warm flex items-center justify-center text-white shadow-glow mb-4">
              <Lock size={24} />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Admin Authentication
            </h1>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              The First Step Solutions · Enter authorized credentials to access control panel
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs text-center font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Username
              </label>
              <input
                type="text"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-xl bg-input border border-border px-4 py-3 pr-10 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-warm px-5 py-3.5 font-semibold text-white shadow-glow hover:opacity-90 transition mt-2 cursor-pointer"
            >
              <ShieldCheck size={18} />
              Sign In to Dashboard
            </button>
          </form>

          {/* Default Credentials Note */}
          <div className="mt-6 pt-5 border-t border-white/5 text-center">
            <span className="text-[11px] text-muted-foreground">
              Default access: <span className="font-mono text-gray-300">admin</span> / <span className="font-mono text-gray-300">admin123</span>
            </span>
          </div>
        </div>

        {/* Back to Website link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-xs text-muted-foreground hover:text-white transition inline-flex items-center gap-1.5"
          >
            <ArrowLeft size={13} />
            Back to Website
          </a>
        </div>
      </div>
    );
  }

  // ── AUTHENTICATED: SHOW FULL DASHBOARD ────────────────────────────────
  return (
    <div className="min-h-screen pt-8 sm:pt-12 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* TWO-TIER RESPONSIVE ADMIN HEADER */}
        <header className="pb-6 border-b border-white/10 space-y-5">
          {/* TIER 1: Branding, Title & Utility Actions */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-brand-orange">
                  Internal Administration
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live API
                </span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Admin Dashboard
              </h1>
            </div>

            {/* Top Action Buttons (Minimalist, never wraps into tabs) */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="/"
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition cursor-pointer"
                title="Return to public site"
              >
                <ArrowLeft size={14} />
                <span className="hidden sm:inline">Back to Site</span>
                <span className="sm:hidden">Site</span>
              </a>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 border border-red-500/30 transition cursor-pointer"
                title="Log out of Admin Panel"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>
          </div>

          {/* TIER 2: Dedicated Scrollable Segmented Navigation Pill Strip */}
          <div className="relative glass rounded-2xl p-1.5 border border-white/10 shadow-inner flex items-center">
            {/* Left Scroll Button (Desktop / Mobile when overflowing) */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => scrollNavBy(-260)}
                aria-label="Scroll tabs left"
                className="flex-shrink-0 z-10 h-8 w-8 mr-1 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer shadow-md"
              >
                <ChevronLeft size={16} />
              </button>
            )}

            <nav
              ref={navScrollRef}
              onScroll={updateNavScrollState}
              onWheel={(e) => {
                if (e.deltaY !== 0 && e.currentTarget.scrollWidth > e.currentTarget.clientWidth) {
                  e.preventDefault();
                  e.currentTarget.scrollLeft += e.deltaY;
                }
              }}
              aria-label="Admin Sections"
              className="flex-1 flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 px-0.5 scroll-smooth"
            >
              <button
                onClick={(e) => {
                  setActiveTab("testimonials");
                  e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-[13px] font-semibold whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
                  activeTab === "testimonials"
                    ? "bg-brand-orange text-white shadow-glow"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <MessageSquare size={15} />
                <span>Testimonials</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                    activeTab === "testimonials"
                      ? "bg-white/20 text-white font-bold"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {testimonials.length}
                </span>
              </button>

              <button
                onClick={(e) => {
                  setActiveTab("showcase");
                  e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-[13px] font-semibold whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
                  activeTab === "showcase"
                    ? "bg-brand-cyan text-black font-bold shadow-glow"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Sparkles size={15} />
                <span>Stall Showcase</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                    activeTab === "showcase"
                      ? "bg-black/20 text-black font-bold"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {showcaseItems.length}
                </span>
              </button>

              <button
                onClick={(e) => {
                  setActiveTab("hero");
                  e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-[13px] font-semibold whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
                  activeTab === "hero"
                    ? "bg-gradient-warm text-white font-bold shadow-glow"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <LayoutTemplate size={15} />
                <span>Home Carousel</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                    activeTab === "hero"
                      ? "bg-white/20 text-white font-bold"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {heroSlides.length}
                </span>
              </button>

              <button
                onClick={(e) => {
                  setActiveTab("brands");
                  e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-[13px] font-semibold whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
                  activeTab === "brands"
                    ? "bg-brand-orange text-white font-bold shadow-glow"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Award size={15} />
                <span>Brand Logos</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                    activeTab === "brands"
                      ? "bg-white/20 text-white font-bold"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {brands.length}
                </span>
              </button>

              <button
                onClick={(e) => {
                  setActiveTab("completed-works");
                  e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-[13px] font-semibold whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
                  activeTab === "completed-works"
                    ? "bg-brand-cyan text-black font-bold shadow-glow"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Layers size={15} />
                <span>Completed Works</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                    activeTab === "completed-works"
                      ? "bg-black/20 text-black font-bold"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {completedWorks.length}
                </span>
              </button>

              <button
                onClick={(e) => {
                  setActiveTab("upcoming-expos");
                  e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-[13px] font-semibold whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
                  activeTab === "upcoming-expos"
                    ? "bg-gradient-warm text-white font-bold shadow-glow"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <CalendarDays size={15} />
                <span>Upcoming Expos</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                    activeTab === "upcoming-expos"
                      ? "bg-white/20 text-white font-bold"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {upcomingExpos.length}
                </span>
              </button>

              <button
                onClick={(e) => {
                  setActiveTab("comparison");
                  e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-[13px] font-semibold whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
                  activeTab === "comparison"
                    ? "bg-brand-cyan text-black font-bold shadow-glow"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <ArrowLeftRight size={15} />
                <span>3D vs Reality</span>
              </button>
            </nav>

            {/* Right Scroll Button (Desktop / Mobile when overflowing) */}
            {canScrollRight && (
              <button
                type="button"
                onClick={() => scrollNavBy(260)}
                aria-label="Scroll tabs right"
                className="flex-shrink-0 z-10 h-8 w-8 ml-1 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer shadow-md"
              >
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </header>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`mt-6 p-4 rounded-2xl flex items-center gap-3 border text-sm ${
              feedback.type === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-300"
                : "bg-red-500/10 border-red-500/30 text-red-300"
            }`}
          >
            <CheckCircle2 size={18} />
            <span className="flex-1">{feedback.text}</span>
            <button onClick={() => setFeedback(null)} className="text-xs underline opacity-75 hover:opacity-100">
              Dismiss
            </button>
          </div>
        )}

        {activeTab === "testimonials" ? (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* ADD / EDIT TESTIMONIAL FORM */}
            <div className="lg:col-span-5 glass rounded-3xl p-7 border border-white/10 self-start">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center ${
                      editingId
                        ? "bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan"
                        : "bg-brand-orange/20 border border-brand-orange/30 text-brand-orange"
                    }`}
                  >
                    {editingId ? <Pencil size={18} /> : <Plus size={18} />}
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-white">
                      {editingId ? "Edit Testimonial" : "Add New Testimonial"}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {editingId ? "Save changes to this testimonial" : "Appears directly on the home page"}
                    </p>
                  </div>
                </div>

                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-300 hover:text-white transition"
                  >
                    <RotateCcw size={13} />
                    Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveTestimonial} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Client Name <span className="text-brand-magenta">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elangovan, Usha Rani.R"
                    className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  />
                </div>

                {/* Stars Rating Selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Stars Rating <span className="text-brand-magenta">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setStars(starVal)}
                        className="p-1 hover:scale-110 transition"
                      >
                        <Star
                          size={24}
                          className={
                            starVal <= stars
                              ? "fill-brand-yellow text-brand-yellow"
                              : "text-gray-600 hover:text-gray-400"
                          }
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-bold text-brand-yellow">{stars} of 5 Stars</span>
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Revathi Equipment India Ltd."
                    className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  />
                </div>

                {/* Photo File Chooser */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Client Photo (Choose from Folder)
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoFileChange}
                    className="hidden"
                  />

                  {photo ? (
                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                      <img
                        src={photo}
                        alt="Client preview"
                        className="h-14 w-14 rounded-full object-cover border-2 border-brand-orange shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white font-semibold truncate">Photo Selected</p>
                        <p className="text-[11px] text-muted-foreground">Will appear beside quote on homepage</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-medium transition"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPhoto("");
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="p-1.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"
                          title="Remove photo"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex flex-col items-center justify-center gap-2 py-6 px-4 rounded-2xl border-2 border-dashed border-white/15 hover:border-brand-orange/60 hover:bg-white/[0.02] transition group cursor-pointer"
                    >
                      <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-brand-orange group-hover:scale-110 transition">
                        <Upload size={18} />
                      </div>
                      <div className="text-center">
                        <span className="text-xs font-semibold text-white group-hover:text-brand-orange transition">
                          Choose photo from your folder
                        </span>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          PNG, JPG, WEBP (automatically optimized)
                        </p>
                      </div>
                    </button>
                  )}
                </div>

                {/* Testimonial Message */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Testimonial Message <span className="text-brand-magenta">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write what the client said about The First Step Solutions..."
                    className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-warm px-5 py-3 font-semibold text-white shadow-glow hover:opacity-90 transition disabled:opacity-50"
                  >
                    {editingId ? <Pencil size={16} /> : <Plus size={16} />}
                    {submitting
                      ? editingId
                        ? "Updating..."
                        : "Saving..."
                      : editingId
                        ? "Update Testimonial"
                        : "Add Testimonial"}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-sm font-semibold text-white transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* LIVE TESTIMONIALS LIST */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2">
                <h2 className="font-display text-xl font-bold text-white">Active Testimonials ({testimonials.length})</h2>
                <button onClick={fetchTestimonials} className="text-xs text-brand-cyan hover:underline">
                  Refresh
                </button>
              </div>

              {testimonials.length === 0 ? (
                <div className="glass rounded-3xl p-12 text-center text-muted-foreground">
                  <p>No testimonials found. Add your first testimonial using the form.</p>
                </div>
              ) : (
                testimonials.map((t) => (
                  <div
                    key={t.id}
                    className={`group glass rounded-2xl p-6 border transition flex flex-col justify-between ${
                      editingId === t.id
                        ? "border-brand-cyan ring-1 ring-brand-cyan/50 bg-white/[0.07]"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex gap-0.5">
                          {[...Array(t.stars || 5)].map((_, i) => (
                            <Star key={i} size={15} className="fill-brand-yellow text-brand-yellow" />
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition">
                          <button
                            onClick={() => handleStartEdit(t)}
                            className="p-1.5 rounded-lg text-brand-cyan hover:text-white hover:bg-brand-cyan/20 transition"
                            title="Edit testimonial"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(t.id)}
                            className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition"
                            title="Delete testimonial"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-gray-200 italic leading-relaxed">"{t.message}"</p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {t.photo ? (
                          <img
                            src={t.photo}
                            alt={t.name}
                            className="h-10 w-10 rounded-full object-cover border border-white/15"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gradient-warm flex items-center justify-center font-bold text-white text-xs">
                            {t.name ? t.name.charAt(0) : "T"}
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-semibold text-white">{t.name}</div>
                          {t.companyName && (
                            <div className="text-xs text-muted-foreground">{t.companyName}</div>
                          )}
                        </div>
                      </div>

                      {editingId === t.id && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan font-semibold">
                          Editing now
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : activeTab === "showcase" ? (
          /* SHOWCASE GALLERY VIEW */
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Form Column (5 cols) */}
            <div className="lg:col-span-5">
              <div className="glass rounded-3xl p-6 sm:p-8 border border-white/10 sticky top-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-warm flex items-center justify-center text-white">
                      {editingShowcaseId ? <Pencil size={18} /> : <Plus size={18} />}
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-bold text-white">
                        {editingShowcaseId ? "Edit Showcase Item" : "Add Showcase Item"}
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Appears in the 3D exhibition showcase
                      </p>
                    </div>
                  </div>

                  {editingShowcaseId && (
                    <button
                      onClick={handleCancelShowcaseEdit}
                      className="text-xs text-muted-foreground hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 cursor-pointer"
                    >
                      <RotateCcw size={12} />
                      Cancel
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveShowcase} className="space-y-5">
                  {/* Item Name (text box) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Name <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={showcaseName}
                      onChange={(e) => setShowcaseName(e.target.value)}
                      placeholder="e.g. Modern Industrial Booth, Cyber Pavilion"
                      className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>

                  {/* Classification (dropdown) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Classification <span className="text-brand-orange">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={showcaseClassification}
                        onChange={(e) => setShowcaseClassification(e.target.value)}
                        className="w-full appearance-none rounded-xl bg-input border border-border px-4 py-3 pr-10 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange cursor-pointer"
                      >
                        {CLASSIFICATION_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#121216] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Stall Image (choose file) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Stall Image (Choose File) <span className="text-brand-orange">*</span>
                    </label>

                    <input
                      type="file"
                      ref={showcaseFileInputRef}
                      onChange={handleShowcaseImageChange}
                      accept="image/*"
                      className="hidden"
                    />

                    {showcaseImage ? (
                      <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/40 group">
                        <img
                          src={resolveStallImage({ id: editingShowcaseId || undefined, image: showcaseImage })}
                          alt="Showcase stall preview"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => showcaseFileInputRef.current?.click()}
                            className="px-3.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium backdrop-blur flex items-center gap-1.5 cursor-pointer"
                          >
                            <Upload size={13} />
                            Change Photo
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowcaseImage("");
                              if (showcaseFileInputRef.current) showcaseFileInputRef.current.value = "";
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-red-500/30 hover:bg-red-500/50 text-red-200 text-xs font-medium backdrop-blur flex items-center gap-1.5 cursor-pointer"
                          >
                            <X size={13} />
                            Remove
                          </button>
                        </div>
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-[10px] text-gray-300 font-mono">
                          Image Selected
                        </span>
                      </div>
                    ) : (
                      <div
                        onClick={() => showcaseFileInputRef.current?.click()}
                        className="rounded-2xl border-2 border-dashed border-white/15 hover:border-brand-orange/60 bg-white/[0.02] hover:bg-white/[0.04] p-6 text-center cursor-pointer transition group"
                      >
                        <div className="h-12 w-12 rounded-xl bg-white/5 mx-auto mb-3 flex items-center justify-center text-muted-foreground group-hover:text-brand-orange group-hover:bg-brand-orange/10 transition">
                          <Upload size={20} />
                        </div>
                        <div className="text-sm font-semibold text-white mb-1">
                          Choose Image from Computer
                        </div>
                        <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                          Click to select a photo from your folders (PNG, JPG, WEBP).
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={showcaseSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-warm px-5 py-3.5 font-semibold text-white shadow-glow hover:opacity-90 transition cursor-pointer disabled:opacity-50"
                  >
                    {editingShowcaseId ? (
                      <>
                        <CheckCircle2 size={18} />
                        Update Showcase Item
                      </>
                    ) : (
                      <>
                        <Plus size={18} />
                        Add Showcase Item
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* List Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2">
                <h2 className="font-display text-xl font-bold text-white">
                  Active Showcase Items ({showcaseItems.length})
                </h2>
                <button
                  onClick={fetchShowcaseItems}
                  className="text-xs text-brand-cyan hover:underline cursor-pointer"
                >
                  Refresh
                </button>
              </div>

              {showcaseItems.length === 0 ? (
                <div className="glass rounded-3xl p-12 text-center text-muted-foreground">
                  <p>No showcase items found. Add your first item using the form on the left.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {showcaseItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`group glass rounded-2xl overflow-hidden border transition flex flex-col ${
                        editingShowcaseId === item.id
                          ? "border-brand-cyan ring-1 ring-brand-cyan/50 bg-white/[0.07]"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {/* Image Preview */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                        <img
                          src={resolveStallImage(item, idx)}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-black/75 backdrop-blur text-brand-orange border border-brand-orange/30">
                            {item.classification}
                          </span>
                        </div>
                        {editingShowcaseId === item.id && (
                          <div className="absolute top-2.5 right-2.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-cyan/90 text-black">
                              Editing
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content & Actions */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <h3 className="font-display text-sm font-bold text-white line-clamp-1 mb-3">
                          {item.name}
                        </h3>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                          <span className="text-[11px] text-muted-foreground">
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Active"}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleStartShowcaseEdit(item)}
                              className="p-1.5 rounded-lg text-brand-cyan hover:text-white hover:bg-brand-cyan/20 transition cursor-pointer"
                              title="Edit item"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteShowcase(item.id, item.name)}
                              className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition cursor-pointer"
                              title="Delete item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : activeTab === "hero" ? (
          /* HERO CAROUSEL VIEW */
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Form Column (5 cols) */}
            <div className="lg:col-span-5">
              <div className="glass rounded-3xl p-6 sm:p-8 border border-white/10 sticky top-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-warm flex items-center justify-center text-white">
                      {editingHeroId ? <Pencil size={18} /> : <Plus size={18} />}
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-bold text-white">
                        {editingHeroId ? "Edit Home Carousel Slide" : "Add Home Carousel Slide"}
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Home page 50/50 stall showcase carousel
                      </p>
                    </div>
                  </div>

                  {editingHeroId && (
                    <button
                      onClick={handleCancelHeroEdit}
                      className="text-xs text-muted-foreground hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 cursor-pointer"
                    >
                      <RotateCcw size={12} />
                      Cancel
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveHeroSlide} className="space-y-4">
                  {/* Stall Photo (choose file) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Stall Photo (50% Split) <span className="text-brand-orange">*</span>
                    </label>

                    <input
                      type="file"
                      ref={heroFileInputRef}
                      onChange={handleHeroImageChange}
                      accept="image/*"
                      className="hidden"
                    />

                    {heroImage ? (
                      <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/40 group">
                        <img
                          src={resolveHeroPreview(editingHeroId ? { id: editingHeroId, image: heroImage } : null, heroImage)}
                          alt="Hero stall preview"
                          className="w-full h-44 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => heroFileInputRef.current?.click()}
                            className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium backdrop-blur flex items-center gap-1.5 cursor-pointer"
                          >
                            <Upload size={13} />
                            Change Photo
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setHeroImage("");
                              if (heroFileInputRef.current) heroFileInputRef.current.value = "";
                            }}
                            className="px-3 py-1.5 rounded-lg bg-red-500/30 hover:bg-red-500/50 text-red-200 text-xs font-medium backdrop-blur flex items-center gap-1.5 cursor-pointer"
                          >
                            <X size={13} />
                            Remove
                          </button>
                        </div>
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-[10px] text-gray-300 font-mono">
                          Image Selected
                        </span>
                      </div>
                    ) : (
                      <div
                        onClick={() => heroFileInputRef.current?.click()}
                        className="rounded-2xl border-2 border-dashed border-white/15 hover:border-brand-orange/60 bg-white/[0.02] hover:bg-white/[0.04] p-5 text-center cursor-pointer transition group"
                      >
                        <div className="h-10 w-10 rounded-xl bg-white/5 mx-auto mb-2 flex items-center justify-center text-muted-foreground group-hover:text-brand-orange group-hover:bg-brand-orange/10 transition">
                          <Upload size={18} />
                        </div>
                        <div className="text-xs font-semibold text-white mb-0.5">
                          Choose Stall Photo from Computer
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          High-resolution wide or landscape photography
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Stall Title <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      placeholder="e.g. AeroTech 360° Custom Modular Stall"
                      className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>

                  {/* Subtitle / Tagline */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Subtitle / Tagline
                    </label>
                    <input
                      type="text"
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      placeholder="e.g. Turnkey 3D Exhibition Pavilion"
                      className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>

                  {/* Category Tag & Badge */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Category Tag
                      </label>
                      <input
                        type="text"
                        value={heroTag}
                        onChange={(e) => setHeroTag(e.target.value)}
                        placeholder="e.g. Exhibition Architecture · Auto Expo"
                        className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Badge Label
                      </label>
                      <input
                        type="text"
                        value={heroBadge}
                        onChange={(e) => setHeroBadge(e.target.value)}
                        placeholder="e.g. ★ Flagship Fabrication"
                        className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={heroDesc}
                      onChange={(e) => setHeroDesc(e.target.value)}
                      placeholder="Bespoke exhibition architecture with precision framing and interactive lounge..."
                      className="w-full rounded-xl bg-input border border-border p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange resize-none"
                    />
                  </div>

                  {/* Specifications (3 fields) */}
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-muted-foreground mb-1">
                        Footprint
                      </label>
                      <input
                        type="text"
                        value={heroFootprint}
                        onChange={(e) => setHeroFootprint(e.target.value)}
                        placeholder="12m × 8m"
                        className="w-full rounded-lg bg-input border border-border px-2.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-muted-foreground mb-1">
                        Structure
                      </label>
                      <input
                        type="text"
                        value={heroStructure}
                        onChange={(e) => setHeroStructure(e.target.value)}
                        placeholder="Double-Decker"
                        className="w-full rounded-lg bg-input border border-border px-2.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-muted-foreground mb-1">
                        Format
                      </label>
                      <input
                        type="text"
                        value={heroFormat}
                        onChange={(e) => setHeroFormat(e.target.value)}
                        placeholder="Island Pavilion"
                        className="w-full rounded-lg bg-input border border-border px-2.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                    </div>
                  </div>

                  {/* Theme Accent Color */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Theme Color Accent
                    </label>
                    <div className="relative">
                      <select
                        value={heroAccent}
                        onChange={(e) => setHeroAccent(e.target.value)}
                        className="w-full appearance-none rounded-xl bg-input border border-border px-4 py-2.5 pr-10 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange cursor-pointer"
                      >
                        {ACCENT_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-[#121216] text-white">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={heroSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-warm px-5 py-3.5 font-semibold text-white shadow-glow hover:opacity-90 transition cursor-pointer disabled:opacity-50 mt-2"
                  >
                    {editingHeroId ? (
                      <>
                        <CheckCircle2 size={18} />
                        Update Hero Slide
                      </>
                    ) : (
                      <>
                        <Plus size={18} />
                        Add Hero Slide
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* List Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2">
                <h2 className="font-display text-xl font-bold text-white">
                  Active Home Carousel Slides ({heroSlides.length})
                </h2>
                <button
                  onClick={fetchHeroSlides}
                  className="text-xs text-brand-cyan hover:underline cursor-pointer"
                >
                  Refresh
                </button>
              </div>

              {heroSlides.length === 0 ? (
                <div className="glass rounded-3xl p-12 text-center text-muted-foreground">
                  <p>No hero slides found. Add your first slide using the form on the left.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {heroSlides.map((slide, idx) => (
                    <div
                      key={slide.id}
                      className={`group glass rounded-2xl overflow-hidden border transition flex flex-col md:flex-row ${
                        editingHeroId === slide.id
                          ? "border-brand-cyan ring-1 ring-brand-cyan/50 bg-white/[0.07]"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {/* Left: 50% Photo Preview */}
                      <div className="relative md:w-5/12 h-48 md:h-auto overflow-hidden bg-black/60 flex-shrink-0">
                        <img
                          src={resolveHeroPreview(slide)}
                          alt={slide.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/80 backdrop-blur text-brand-orange border border-brand-orange/30">
                            {slide.badge || "★ Stall"}
                          </span>
                        </div>
                        <div className="absolute bottom-2.5 left-2.5">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 text-gray-300">
                            Slide {idx + 1}
                          </span>
                        </div>
                      </div>

                      {/* Right: Content details */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-1.5">
                            <div>
                              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                                {slide.tag}
                              </span>
                              <h3 className="font-display text-base font-bold text-white leading-snug">
                                {slide.title}
                              </h3>
                              <p className="text-xs font-semibold text-brand-orange">
                                {slide.subtitle}
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <button
                                onClick={() => handleStartHeroEdit(slide)}
                                className="p-1.5 rounded-lg text-brand-cyan hover:text-white hover:bg-brand-cyan/20 transition cursor-pointer"
                                title="Edit slide"
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteHeroSlide(slide.id, slide.title)}
                                className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition cursor-pointer"
                                title="Delete slide"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          <p className="text-xs text-gray-300 line-clamp-2 mt-2 leading-relaxed">
                            {slide.desc}
                          </p>

                          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/5">
                            <div className="text-center p-1.5 rounded-lg bg-white/[0.03]">
                              <div className="text-[9px] uppercase text-muted-foreground">Footprint</div>
                              <div className="text-xs font-bold text-white truncate">{slide.footprint || "—"}</div>
                            </div>
                            <div className="text-center p-1.5 rounded-lg bg-white/[0.03]">
                              <div className="text-[9px] uppercase text-muted-foreground">Structure</div>
                              <div className="text-xs font-bold text-white truncate">{slide.structure || "—"}</div>
                            </div>
                            <div className="text-center p-1.5 rounded-lg bg-white/[0.03]">
                              <div className="text-[9px] uppercase text-muted-foreground">Format</div>
                              <div className="text-xs font-bold text-white truncate">{slide.format || "—"}</div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${slide.accent || "from-brand-orange to-brand-magenta"}`} />
                            Live on Home Page
                          </span>
                          {editingHeroId === slide.id && (
                            <span className="px-2 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan font-bold text-[10px]">
                              Editing now
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : activeTab === "brands" ? (
          /* BRAND LOGOS VIEW */
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Form Column (4 cols) */}
            <div className="lg:col-span-4">
              <div className="glass rounded-3xl p-6 sm:p-8 border border-white/10 sticky top-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-warm flex items-center justify-center text-white">
                      {editingBrandId ? <Pencil size={18} /> : <Plus size={18} />}
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-bold text-white">
                        {editingBrandId ? "Edit Brand Logo" : "Upload Brand Logo"}
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        {editingBrandId ? "Replace this client brand logo" : "Appears in 'Trusted By Industry Leaders' marquee"}
                      </p>
                    </div>
                  </div>

                  {editingBrandId && (
                    <button
                      onClick={handleCancelBrandEdit}
                      className="text-xs text-muted-foreground hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 cursor-pointer"
                    >
                      <RotateCcw size={12} />
                      Cancel
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveBrand} className="space-y-5">
                  {/* Logo Image Upload */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Brand Logo Image (Upload) <span className="text-brand-orange">*</span>
                    </label>

                    {brandImage ? (
                      <div className="space-y-3">
                        {/* Render inside a crisp white card to show true contrast, identical to the Marquee */}
                        <div className="relative rounded-2xl bg-white p-6 shadow-inner flex items-center justify-center border border-white/20 min-h-[140px]">
                          <img
                            src={brandImage}
                            alt="Brand Logo Preview"
                            className="max-h-20 max-w-full object-contain"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setBrandImage("");
                              if (brandFileInputRef.current) brandFileInputRef.current.value = "";
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white transition cursor-pointer"
                            title="Remove logo"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => brandFileInputRef.current?.click()}
                          className="w-full text-xs text-center py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Upload size={13} />
                          Choose Different Logo File
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => brandFileInputRef.current?.click()}
                        className="rounded-2xl border-2 border-dashed border-white/20 hover:border-brand-orange/60 bg-white/[0.02] hover:bg-white/[0.04] p-8 text-center cursor-pointer transition flex flex-col items-center justify-center gap-3 group"
                      >
                        <div className="h-12 w-12 rounded-xl bg-white/5 group-hover:bg-brand-orange/20 flex items-center justify-center text-muted-foreground group-hover:text-brand-orange transition">
                          <Upload size={22} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">Click to select brand logo</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">PNG (transparent), SVG, JPEG, or WEBP</p>
                        </div>
                      </div>
                    )}

                    <input
                      ref={brandFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleBrandImageChange}
                      className="hidden"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={brandSubmitting || !brandImage}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-warm px-5 py-3 text-sm font-semibold text-white shadow-glow hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {brandSubmitting ? (
                        <span>Saving...</span>
                      ) : editingBrandId ? (
                        <>
                          <CheckCircle2 size={16} />
                          Update Brand Logo
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          Add Brand Logo
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* List Column (8 cols) */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-white">
                    Active Brand Logos ({brands.length})
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Live client logos looping seamlessly in the marquee on the home page
                  </p>
                </div>
                <button
                  onClick={fetchBrands}
                  className="text-xs text-muted-foreground hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer"
                >
                  <RotateCcw size={12} />
                  Refresh
                </button>
              </div>

              {brands.length === 0 ? (
                <div className="glass rounded-3xl p-12 text-center text-muted-foreground">
                  <Award size={36} className="mx-auto mb-3 opacity-40" />
                  <p>No brand logos found. Upload your first logo on the left.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {brands.map((brand, idx) => {
                    const src = resolveBrandLogoSrc(brand, idx);
                    const isEditing = editingBrandId === brand.id;
                    return (
                      <div
                        key={brand.id}
                        className={`group relative rounded-2xl bg-white p-4 h-32 flex flex-col items-center justify-between shadow-sm transition border ${
                          isEditing
                            ? "ring-2 ring-brand-orange border-brand-orange scale-[1.02]"
                            : "border-black/5 hover:shadow-md"
                        }`}
                      >
                        {/* Index Badge */}
                        <div className="w-full flex items-center justify-between text-[10px] text-gray-400">
                          <span className="font-semibold text-gray-500">#{idx + 1}</span>
                          {isEditing && (
                            <span className="px-1.5 py-0.5 rounded bg-brand-orange text-white font-bold text-[9px]">
                              Editing
                            </span>
                          )}
                        </div>

                        {/* Logo Image */}
                        <div className="flex-1 w-full flex items-center justify-center px-1 py-1 overflow-hidden">
                          <img
                            src={src}
                            alt={`Brand Logo ${idx + 1}`}
                            className="max-h-14 max-w-full object-contain filter group-hover:scale-105 transition-transform duration-200"
                            loading="lazy"
                          />
                        </div>

                        {/* Action buttons */}
                        <div className="w-full flex items-center justify-end gap-1 pt-1 border-t border-gray-100">
                          <button
                            type="button"
                            onClick={() => handleStartBrandEdit(brand, idx)}
                            className="p-1 rounded-md text-gray-500 hover:text-brand-orange hover:bg-orange-50 transition cursor-pointer"
                            title="Edit / Replace Logo"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBrand(brand.id, idx)}
                            className="p-1 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            title="Delete Brand Logo"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : activeTab === "completed-works" ? (
          /* COMPLETED EXHIBITION WORKS VIEW */
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Form Column (5 cols) */}
            <div className="lg:col-span-5">
              <div className="glass rounded-3xl p-6 sm:p-8 border border-white/10 sticky top-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-warm flex items-center justify-center text-white">
                      {editingWorkId ? <Pencil size={18} /> : <Plus size={18} />}
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-bold text-white">
                        {editingWorkId ? "Edit Completed Work" : "Add Completed Work"}
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Exhibition stall card on /work page
                      </p>
                    </div>
                  </div>

                  {editingWorkId && (
                    <button
                      onClick={handleCancelWorkEdit}
                      className="text-xs text-muted-foreground hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 cursor-pointer"
                    >
                      <RotateCcw size={12} />
                      Cancel
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveCompletedWork} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Stall / Project Name <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={workName}
                      onChange={(e) => setWorkName(e.target.value)}
                      placeholder="e.g. AeroTech 360° Industrial Booth"
                      className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>

                  {/* Client & Format in 2 cols */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Client / Brand <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={workClient}
                        onChange={(e) => setWorkClient(e.target.value)}
                        placeholder="e.g. ELGi Compressors"
                        className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Stall Type <span className="text-brand-orange">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={workStallType}
                          onChange={(e) => setWorkStallType(e.target.value)}
                          className="w-full appearance-none rounded-xl bg-input border border-border px-4 py-2.5 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange cursor-pointer"
                        >
                          {COMPLETED_WORK_STALL_TYPES.map((type) => (
                            <option key={type} value={type} className="bg-background text-foreground">
                              {type}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Place / Venue */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Place / Venue <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={workPlace}
                      onChange={(e) => setWorkPlace(e.target.value)}
                      placeholder="e.g. Codissia Trade Fair Complex, Coimbatore"
                      className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>

                  {/* Date, Time & Size in 3 cols */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Date <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={workDate}
                        onChange={(e) => setWorkDate(e.target.value)}
                        placeholder="Oct 2024"
                        className="w-full rounded-xl bg-input border border-border px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Duration <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={workTime}
                        onChange={(e) => setWorkTime(e.target.value)}
                        placeholder="4-Day Expo"
                        className="w-full rounded-xl bg-input border border-border px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Size <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={workSize}
                        onChange={(e) => setWorkSize(e.target.value)}
                        placeholder="12m × 8m"
                        className="w-full rounded-xl bg-input border border-border px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                    </div>
                  </div>

                  {/* Multi-Image Stall Photos Upload */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Stall Photos <span className="text-brand-orange">*</span>
                      </label>
                      <span className="text-[11px] text-brand-orange font-medium">
                        {workImages.length} photo{workImages.length === 1 ? "" : "s"} added
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mb-3">
                      Upload multiple angles. The first photo acts as the cover; visitors will slide & swipe through all angles on the work page.
                    </p>

                    {workImages.length > 0 ? (
                      <div className="space-y-3">
                        {/* Primary Cover Image Preview */}
                        <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black border border-white/10 group">
                          <img
                            src={workImages[0]}
                            alt="Stall cover preview"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute top-2.5 left-2.5">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-brand-orange text-white shadow-glow">
                              ★ Cover Photo
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveWorkImage(0)}
                            className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/70 hover:bg-black text-white transition cursor-pointer"
                            title="Remove cover photo"
                          >
                            <X size={14} />
                          </button>
                        </div>

                        {/* Thumbnail Grid & Actions */}
                        <div className="grid grid-cols-4 gap-2">
                          {workImages.map((img, idx) => (
                            <div
                              key={idx}
                              className={`relative aspect-square rounded-xl overflow-hidden border-2 bg-black group ${
                                idx === 0 ? "border-brand-orange ring-2 ring-brand-orange/40" : "border-white/10"
                              }`}
                            >
                              <img src={img} alt={`Angle ${idx + 1}`} className="h-full w-full object-cover" />
                              <div className="absolute top-1 left-1 bg-black/70 rounded px-1 text-[9px] font-bold text-white">
                                #{idx + 1}
                              </div>
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-1 p-1">
                                {idx !== 0 && (
                                  <button
                                    type="button"
                                    onClick={() => handleSetCoverWorkImage(idx)}
                                    className="text-[9px] px-1.5 py-0.5 rounded bg-brand-orange text-white font-bold hover:scale-105 transition cursor-pointer"
                                    title="Set as Cover"
                                  >
                                    Cover
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveWorkImage(idx)}
                                  className="p-1 rounded-full bg-red-500/80 hover:bg-red-500 text-white transition cursor-pointer"
                                  title="Delete photo"
                                >
                                  <Trash2 size={11} />
                                </button>
                              </div>
                            </div>
                          ))}

                          {/* Add More Photos Button */}
                          <button
                            type="button"
                            onClick={() => workFileInputRef.current?.click()}
                            className="aspect-square rounded-xl border border-dashed border-white/20 hover:border-brand-orange/60 bg-white/[0.03] hover:bg-white/[0.06] flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-white transition cursor-pointer group"
                            title="Add more photos"
                          >
                            <Plus size={16} className="text-brand-orange group-hover:scale-110 transition" />
                            <span className="text-[10px] font-semibold text-center leading-tight">Add More</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => workFileInputRef.current?.click()}
                        className="rounded-2xl border-2 border-dashed border-white/20 hover:border-brand-orange/60 bg-white/[0.02] hover:bg-white/[0.04] p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 group"
                      >
                        <div className="h-10 w-10 rounded-xl bg-white/5 group-hover:bg-brand-orange/20 flex items-center justify-center text-muted-foreground group-hover:text-brand-orange transition">
                          <Upload size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">Choose Stall Photos (Multiple allowed)</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            Select one or multiple images to create a sliding multi-angle exhibition deck
                          </p>
                        </div>
                      </div>
                    )}

                    <input
                      ref={workFileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleWorkImageChange}
                      className="hidden"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Scope / Description (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={workDescription}
                      onChange={(e) => setWorkDescription(e.target.value)}
                      placeholder="Details on fabrication materials, lighting, or turnkey delivery..."
                      className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={workSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-warm px-5 py-3 text-sm font-semibold text-white shadow-glow hover:opacity-90 transition cursor-pointer disabled:opacity-50"
                    >
                      {workSubmitting ? (
                        <span>Saving...</span>
                      ) : editingWorkId ? (
                        <>
                          <CheckCircle2 size={16} />
                          Update Completed Work
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          Add Completed Work
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* List Column (7 cols) */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-white">
                    Active Completed Works ({completedWorks.length})
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Live on <a href="/work" target="_blank" className="text-brand-orange underline">/work</a> page below project list
                  </p>
                </div>
                <button
                  onClick={fetchCompletedWorks}
                  className="text-xs text-muted-foreground hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer"
                >
                  <RotateCcw size={12} />
                  Refresh
                </button>
              </div>

              {completedWorks.length === 0 ? (
                <div className="glass rounded-3xl p-12 text-center text-muted-foreground">
                  <Layers size={36} className="mx-auto mb-3 opacity-40" />
                  <p>No completed works found. Add your first exhibition stall on the left.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {completedWorks.map((work, idx) => {
                    const src = resolveCompletedWorkImage(work, idx);
                    const isEditing = editingWorkId === work.id;
                    return (
                      <div
                        key={work.id}
                        className={`group glass rounded-2xl overflow-hidden border transition flex flex-col ${
                          isEditing
                            ? "border-brand-orange ring-1 ring-brand-orange/50 bg-white/[0.07]"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        {/* Image Preview with Slider */}
                        <AdminWorkCardPreview
                          work={work}
                          index={idx}
                          isEditing={isEditing}
                        />

                        {/* Content & Specs */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="text-[10px] uppercase font-bold text-brand-orange truncate mb-0.5">
                              {work.client}
                            </div>
                            <h3 className="font-display text-sm font-bold text-white line-clamp-1 mb-2">
                              {work.name}
                            </h3>

                            {/* Mini Specs */}
                            <div className="grid grid-cols-2 gap-1.5 text-[10px] text-gray-300 p-2 rounded-xl bg-white/[0.03] mb-3">
                              <div className="truncate" title={work.place}>📍 {work.place}</div>
                              <div className="truncate" title={work.size}>📐 {work.size}</div>
                              <div className="truncate">📅 {work.date}</div>
                              <div className="truncate">⏱️ {work.time}</div>
                            </div>

                            {work.description && (
                              <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                                {work.description}
                              </p>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/5 text-[11px]">
                            <span className="text-muted-foreground">ID: {work.id.slice(0, 10)}</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleStartWorkEdit(work, idx)}
                                className="p-1.5 rounded-lg text-brand-cyan hover:text-white hover:bg-brand-cyan/20 transition cursor-pointer"
                                title="Edit Completed Work"
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteWork(work.id, work.name)}
                                className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition cursor-pointer"
                                title="Delete Completed Work"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : activeTab === "upcoming-expos" ? (
          /* UPCOMING EXPOS VIEW */
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Form Column (5 cols) */}
            <div className="lg:col-span-5">
              <div className="glass rounded-3xl p-6 sm:p-8 border border-white/10 sticky top-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-warm flex items-center justify-center text-white">
                      {editingExpoId ? <Pencil size={18} /> : <Plus size={18} />}
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-bold text-white">
                        {editingExpoId ? "Edit Upcoming Expo" : "Add Upcoming Expo"}
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Exhibition calendar table on /work page
                      </p>
                    </div>
                  </div>

                  {editingExpoId && (
                    <button
                      onClick={handleCancelExpoEdit}
                      className="text-xs text-muted-foreground hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 cursor-pointer"
                    >
                      <RotateCcw size={12} />
                      Cancel
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveExpo} className="space-y-4">
                  {/* Expo Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Expo / Exhibition Name <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={expoName}
                      onChange={(e) => setExpoName(e.target.value)}
                      placeholder="e.g. IMTEX 2025 & Tooltech"
                      className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>

                  {/* Sector / Industry */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Sector / Industry <span className="text-brand-orange">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={expoSector}
                        onChange={(e) => setExpoSector(e.target.value)}
                        className="w-full appearance-none rounded-xl bg-input border border-border px-4 py-2.5 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange cursor-pointer"
                      >
                        {EXPO_SECTOR_OPTIONS.map((sec) => (
                          <option key={sec} value={sec} className="bg-background text-foreground">
                            {sec}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  {/* Dates & Duration in 2 cols */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Dates <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={expoDate}
                        onChange={(e) => setExpoDate(e.target.value)}
                        placeholder="e.g. 23–29 Jan 2025"
                        className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Timings / Duration <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={expoTime}
                        onChange={(e) => setExpoTime(e.target.value)}
                        placeholder="e.g. 10:00 AM – 6:00 PM (7 Days)"
                        className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                    </div>
                  </div>

                  {/* City & Status in 2 cols */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        City <span className="text-brand-orange">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={expoCity}
                        onChange={(e) => setExpoCity(e.target.value)}
                        placeholder="e.g. Bengaluru"
                        className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Fabrication Status <span className="text-brand-orange">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={expoStatus}
                          onChange={(e) => setExpoStatus(e.target.value)}
                          className="w-full appearance-none rounded-xl bg-input border border-border px-4 py-2.5 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange cursor-pointer"
                        >
                          {EXPO_STATUS_OPTIONS.map((st) => (
                            <option key={st} value={st} className="bg-background text-foreground">
                              {st}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Place / Venue */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Venue / Centre <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={expoPlace}
                      onChange={(e) => setExpoPlace(e.target.value)}
                      placeholder="e.g. BIEC (Bangalore International Exhibition Centre)"
                      className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>

                  {/* Edition & Website URL in 2 cols */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Edition / Subtitle (Optional)
                      </label>
                      <input
                        type="text"
                        value={expoEdition}
                        onChange={(e) => setExpoEdition(e.target.value)}
                        placeholder="e.g. 21st Edition"
                        className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Website Link (Optional)
                      </label>
                      <input
                        type="url"
                        value={expoWebsiteUrl}
                        onChange={(e) => setExpoWebsiteUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={expoSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-warm px-5 py-3 text-sm font-semibold text-white shadow-glow hover:opacity-90 transition cursor-pointer disabled:opacity-50"
                    >
                      {expoSubmitting ? (
                        <span>Saving...</span>
                      ) : editingExpoId ? (
                        <>
                          <CheckCircle2 size={16} />
                          Update Upcoming Expo
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          Add Upcoming Expo
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* List Column (7 cols) */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-white">
                    Active Upcoming Expos ({upcomingExpos.length})
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Live in the Upcoming Expos schedule table on <a href="/work" target="_blank" className="text-brand-orange underline">/work</a>
                  </p>
                </div>
                <button
                  onClick={fetchUpcomingExpos}
                  className="text-xs text-muted-foreground hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer"
                >
                  <RotateCcw size={12} />
                  Refresh
                </button>
              </div>

              {upcomingExpos.length === 0 ? (
                <div className="glass rounded-3xl p-12 text-center text-muted-foreground">
                  <CalendarDays size={36} className="mx-auto mb-3 opacity-40" />
                  <p>No upcoming expos found. Add your first trade show on the left.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingExpos.map((expo) => {
                    const isEditing = editingExpoId === expo.id;
                    return (
                      <div
                        key={expo.id}
                        className={`group glass rounded-2xl p-5 border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                          isEditing
                            ? "border-brand-orange ring-1 ring-brand-orange/50 bg-white/[0.07]"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-orange/20 text-brand-orange border border-brand-orange/30">
                              {expo.sector}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/10 text-gray-300">
                              {expo.status}
                            </span>
                            {isEditing && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-orange text-white">
                                Editing
                              </span>
                            )}
                          </div>

                          <h3 className="font-display text-base font-bold text-white truncate">
                            {expo.name} {expo.edition && <span className="text-xs text-muted-foreground font-normal">({expo.edition})</span>}
                          </h3>

                          <div className="flex items-center gap-3 text-xs text-gray-300 flex-wrap">
                            <span className="inline-flex items-center gap-1">
                              <Calendar size={13} className="text-brand-orange" />
                              {expo.date}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Clock size={13} className="text-brand-cyan" />
                              {expo.time}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={13} className="text-brand-yellow" />
                              {expo.city} — {expo.place}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1.5 flex-shrink-0 self-end sm:self-center">
                          <button
                            onClick={() => handleStartExpoEdit(expo)}
                            className="p-2 rounded-lg text-brand-cyan hover:text-white hover:bg-brand-cyan/20 transition cursor-pointer"
                            title="Edit Expo"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteExpo(expo.id, expo.name)}
                            className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition cursor-pointer"
                            title="Delete Expo"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* 3D VS REALITY (STALL COMPARISON) VIEW */
          <div className="mt-10 max-w-5xl mx-auto space-y-8">
            <div className="glass rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-warm flex items-center justify-center text-white">
                    <ArrowLeftRight size={18} />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-white">
                      3D Render vs. Real Stall Comparison
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Controls the interactive before/after slider on the <a href="/work" target="_blank" className="text-brand-orange underline">/work</a> page
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={fetchComparison}
                  className="text-xs text-muted-foreground hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer"
                >
                  <RotateCcw size={12} />
                  Reset to Current
                </button>
              </div>

              <form onSubmit={handleSaveComparison} className="space-y-6">
                {/* Meta details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Stall / Project Title
                    </label>
                    <input
                      type="text"
                      value={compTitle}
                      onChange={(e) => setCompTitle(e.target.value)}
                      placeholder="e.g. Precision Engineering Expo Pavilion"
                      className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Client / Brand
                    </label>
                    <input
                      type="text"
                      value={compClient}
                      onChange={(e) => setCompClient(e.target.value)}
                      placeholder="e.g. Precision Systems India (Demo Expo)"
                      className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Venue & City
                    </label>
                    <input
                      type="text"
                      value={compVenue}
                      onChange={(e) => setCompVenue(e.target.value)}
                      placeholder="e.g. Chennai Trade Centre, Nandambakkam"
                      className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Comparison Subtitle / Tagline
                    </label>
                    <input
                      type="text"
                      value={compSubtitle}
                      onChange={(e) => setCompSubtitle(e.target.value)}
                      placeholder="e.g. 3D CAD Visualization vs. Physical On-Ground Fabrication"
                      className="w-full rounded-xl bg-input border border-border px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>
                </div>

                {/* 2 Comparison Image Uploaders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  {/* LEFT: 3D CAD Render */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-cyan flex items-center gap-1.5">
                        <Box size={14} />
                        1. 3D CAD Concept Render Image
                      </span>
                    </div>

                    {compRenderImage ? (
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black border border-white/10 group">
                        <img
                          src={compRenderImage}
                          alt="3D render preview"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setCompRenderImage("");
                            if (renderFileInputRef.current) renderFileInputRef.current.value = "";
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white transition cursor-pointer"
                          title="Remove image"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => renderFileInputRef.current?.click()}
                        className="aspect-[16/10] rounded-xl border-2 border-dashed border-white/20 hover:border-brand-cyan/60 bg-white/[0.02] hover:bg-white/[0.04] p-4 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 group"
                      >
                        <Upload size={22} className="text-muted-foreground group-hover:text-brand-cyan transition" />
                        <span className="text-xs font-semibold text-white">Upload 3D Render Image</span>
                        <span className="text-[10px] text-muted-foreground">PNG, JPEG, WEBP</span>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => renderFileInputRef.current?.click()}
                      className="w-full text-xs py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Upload size={13} />
                      Choose Different 3D Image
                    </button>
                    <input
                      ref={renderFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleRenderFileChange}
                      className="hidden"
                    />
                  </div>

                  {/* RIGHT: Real Executed Stall Photo */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 size={14} />
                        2. Real Executed Stall Photograph
                      </span>
                    </div>

                    {compExecutedImage ? (
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black border border-white/10 group">
                        <img
                          src={compExecutedImage}
                          alt="Executed stall preview"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setCompExecutedImage("");
                            if (executedFileInputRef.current) executedFileInputRef.current.value = "";
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white transition cursor-pointer"
                          title="Remove image"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => executedFileInputRef.current?.click()}
                        className="aspect-[16/10] rounded-xl border-2 border-dashed border-white/20 hover:border-emerald-500/60 bg-white/[0.02] hover:bg-white/[0.04] p-4 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 group"
                      >
                        <Upload size={22} className="text-muted-foreground group-hover:text-emerald-400 transition" />
                        <span className="text-xs font-semibold text-white">Upload Real Executed Photo</span>
                        <span className="text-[10px] text-muted-foreground">PNG, JPEG, WEBP</span>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => executedFileInputRef.current?.click()}
                      className="w-full text-xs py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Upload size={13} />
                      Choose Different Photo
                    </button>
                    <input
                      ref={executedFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleExecutedFileChange}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={compSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-warm px-5 py-3 text-sm font-semibold text-white shadow-glow hover:opacity-90 transition cursor-pointer disabled:opacity-50"
                  >
                    {compSubmitting ? (
                      <span>Saving Comparison...</span>
                    ) : (
                      <>
                        <CheckCircle2 size={16} />
                        Save & Publish 3D vs Reality Comparison
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
