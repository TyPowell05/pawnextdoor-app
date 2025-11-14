import { useState, useEffect } from "react";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/logo.png"
        alt="PawNextDoor logo"
        className="w-10 h-10"
      />
      <span className="text-lg sm:text-xl font-bold text-brand.teal tracking-tight">
        PawNextDoor
      </span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="bg-white border border-teal-100 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-teal-700 mb-3">{title}</h3>
      {children}
    </section>
  );
}

function Nav({ tab, setTab }) {
  const items = [
    { id: "landing", label: "Landing" },
    { id: "owner", label: "Find Stay" },
    { id: "listing", label: "Listings" },
    { id: "pet", label: "Pet Profile" },
    { id: "host", label: "Become a Host" },
    { id: "booking", label: "Book" },
    { id: "payments", label: "Payment" },
    { id: "success", label: "Success" },
    { id: "receipts", label: "Receipts" },
    { id: "rate", label: "Rate" },
    { id: "refund", label: "Cancel/Refund" },
    { id: "dashboard", label: "Host Dashboard" },
    { id: "notifications", label: "Notifications" },
    { id: "settings", label: "Settings" },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <button
          key={i.id}
          onClick={() => setTab(i.id)}
          className={`px-3 py-1.5 rounded-xl border ${
            tab === i.id ? "bg-teal-500 text-white border-teal-500" : "bg-white text-teal-700 border-teal-300"
          }`}
        >
          {i.label}
        </button>
      ))}
    </div>
  );
}

// Photo Uploader
function PhotoUploader({ label, max = 5 }) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  const onSelect = (list) => {
    if (!list) return;
    setError(null);
    const incoming = Array.from(list);
    const allowed = ["image/png", "image/jpeg", "image/webp"];
    const tooBig = incoming.find((f) => f.size > 5 * 1024 * 1024);
    const badType = incoming.find((f) => !allowed.includes(f.type));
    if (tooBig) return setError("One or more files exceed 5MB.");
    if (badType) return setError("Only PNG, JPG, or WEBP images are allowed.");
    const next = [...files, ...incoming].slice(0, max);
    if (next.length > max) setError(`Maximum ${max} photos.`);
    setFiles(next);
  };

  const onDrop = (e) => {
    e.preventDefault();
    onSelect(e.dataTransfer.files);
  };

  const removeAt = (idx) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  return (
    <div>
      <label className="block text-sm font-medium text-teal-700 mb-2">{label}</label>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="border-2 border-dashed border-teal-300 rounded-2xl p-4 bg-teal-50/50 text-center"
      >
        <p className="text-sm text-gray-600">Drag & drop photos here, or</p>
        <div className="mt-2">
          <input id={`file-${label}`} type="file" accept="image/*" multiple onChange={(e) => onSelect(e.target.files)} className="hidden" />
          <label htmlFor={`file-${label}`} className="inline-block mt-1 bg-teal-600 text-white px-4 py-2 rounded-lg cursor-pointer">
            Choose Files
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-2">Up to {max} photos • PNG/JPG/WEBP • Max 5MB each</p>
      </div>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
          {previews.map((src, i) => (
            <div key={i} className="relative group">
              <img src={src} className="w-full h-32 object-cover rounded-xl border border-teal-100" />
              <button onClick={() => removeAt(i)} className="absolute top-2 right-2 bg-white/90 border border-teal-300 text-teal-700 text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Views
function Landing({ setTab }) {
  const [aboutTab, setAboutTab] = useState("overview");

  const scrollToAbout = () => {
    const el = document.getElementById("landing-about");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="space-y-10">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-brand.mint/60 via-white to-brand.mint/40 rounded-3xl shadow-soft border border-brand.mint/70 px-6 py-8 md:px-10 md:py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: copy + CTAs */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-brand.teal bg-white/80 border border-brand.mint px-3 py-1 rounded-full">
              🐾 Beta preview · PawNextDoor
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-brand.ink leading-tight">
              Neighborhood homes for happy, stress-free pets.
            </h1>

            <p className="text-sm md:text-base text-slate-700 max-w-xl">
              Skip the noisy kennels. PawNextDoor connects you with nearby homes
              that match your pet&apos;s routine — fenced yards, no other pets,
              work-from-home hosts, and more.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
  type="button"
  onClick={() => setTab("owner")}
  className="bg-teal-700 text-white px-5 py-2.5 rounded-xl shadow-lg hover:bg-teal-800"
>
  Find a stay
</button>
              <button
                type="button"
                onClick={() => setTab("host")}
                className="bg-white text-brand.teal border border-brand.teal px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand.mint/40 transition"
              >
                Become a host
              </button>

              <button
                type="button"
                onClick={scrollToAbout}
                className="text-sm font-medium text-slate-700 hover:text-brand.teal underline-offset-2 hover:underline"
              >
                About us
              </button>
            </div>

            <ul className="mt-3 text-sm text-slate-800 space-y-1">
              <li>• Smart matching by yard type, other pets, and host schedule.</li>
              <li>• Transparent ratings for homes, hosts, and pets.</li>
              <li>• Simple, receipt-ready payments for owners and hosts.</li>
            </ul>
          </div>

          {/* Right: hero image */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-brand.mint/60 blur-xl opacity-60" />
            <div className="relative rounded-3xl overflow-hidden shadow-soft bg-white">
              <img
                src="/hero.jpg"
                alt="Happy dog relaxing at a host home"
                className="w-full h-72 md:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About / How it works / Overview section */}
      <section
        id="landing-about"
        className="bg-white/80 rounded-3xl shadow-soft border border-brand.mint/50 px-4 py-6 md:px-6 md:py-7 space-y-5"
      >
        {/* Tab nav */}
        <div className="inline-flex rounded-full bg-brand.mint/40 p-1 text-xs md:text-sm">
          <button
            type="button"
            onClick={() => setAboutTab("overview")}
            className={
              "px-4 py-1.5 rounded-full transition " +
              (aboutTab === "overview"
                ? "bg-white text-brand.ink shadow-soft"
                : "text-slate-600 hover:text-brand.ink")
            }
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setAboutTab("how")}
            className={
              "px-4 py-1.5 rounded-full transition " +
              (aboutTab === "how"
                ? "bg-white text-brand.ink shadow-soft"
                : "text-slate-600 hover:text-brand.ink")
            }
          >
            How it works
          </button>
          <button
            type="button"
            onClick={() => setAboutTab("about")}
            className={
              "px-4 py-1.5 rounded-full transition " +
              (aboutTab === "about"
                ? "bg-white text-brand.ink shadow-soft"
                : "text-slate-600 hover:text-brand.ink")
            }
          >
            About us
          </button>
        </div>

        {/* Tab content */}
        {aboutTab === "overview" && (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-brand.mint/60 px-4 py-4">
              <h3 className="text-sm font-semibold text-brand.ink mb-1">
                For pet owners
              </h3>
              <p className="text-xs text-slate-700">
                Filter for fenced yards, no other pets, or quiet streets and see
                homes that fit your pet&apos;s personality instead of rolling
                the dice with a generic kennel.
              </p>
            </div>
            <div className="bg-brand.mint/40 rounded-2xl border border-brand.mint px-4 py-4">
              <h3 className="text-sm font-semibold text-brand.ink mb-1">
                For trusted hosts
              </h3>
              <p className="text-xs text-slate-700">
                Earn extra income watching pets that match your home and
                routine, with clear expectations and a shared profile for each
                pet.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-brand.mint/60 px-4 py-4">
              <h3 className="text-sm font-semibold text-brand.ink mb-1">
                For neighborhoods
              </h3>
              <p className="text-xs text-slate-700">
                Keep care hyper-local: neighbors helping neighbors, instead of
                shipping pets across town to crowded facilities.
              </p>
            </div>
          </div>
        )}

        {aboutTab === "how" && (
          <div className="grid md:grid-cols-3 gap-4 text-xs text-slate-700">
            <div className="bg-white rounded-2xl border border-slate-200 px-4 py-4">
              <h3 className="text-sm font-semibold text-brand.ink mb-1">
                1. Tell us about your pet
              </h3>
              <p>
                Add your pet&apos;s routine, energy level, yard needs, and
                quirks. This helps us filter out homes that aren&apos;t a good
                fit.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 px-4 py-4">
              <h3 className="text-sm font-semibold text-brand.ink mb-1">
                2. Match with nearby hosts
              </h3>
              <p>
                Browse hosts by fenced yard, other pets, schedule, and ratings.
                See a snapshot of their home before you book.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 px-4 py-4">
              <h3 className="text-sm font-semibold text-brand.ink mb-1">
                3. Book, pay, and get receipts
              </h3>
              <p>
                Confirm dates, pay securely, and keep a clean record of stays
                and receipts for vet records, budgeting, or taxes.
              </p>
            </div>
          </div>
        )}

        {aboutTab === "about" && (
          <div className="grid md:grid-cols-2 gap-4 text-xs text-slate-700">
            <div className="bg-white rounded-2xl border border-slate-200 px-4 py-4">
              <h3 className="text-sm font-semibold text-brand.ink mb-1">
                Why PawNextDoor?
              </h3>
              <p className="mb-2">
                PawNextDoor started from a simple pain point: families who hate
                dropping their pets at loud, crowded boarding facilities but
                don&apos;t always have a friend available to help.
              </p>
              <p>
                We imagine a world where every neighborhood has a handful of
                trusted, vetted hosts that pets already know and love.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 px-4 py-4">
              <h3 className="text-sm font-semibold text-brand.ink mb-1">
                Our promise in a full launch
              </h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>Transparent reviews for both owners and hosts.</li>
                <li>Clear expectations around safety, routines, and yards.</li>
                <li>
                  Simple, receipt-ready payments and payout tracking for hosts.
                </li>
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Help & contact strip */}
      <section className="bg-brand.mint/40 rounded-3xl border border-brand.mint/80 px-4 py-5 md:px-6 md:py-6">
        <div className="grid md:grid-cols-3 gap-4 items-center text-xs md:text-sm text-slate-800">
          <div>
            <h3 className="text-sm font-semibold text-brand.ink mb-1">
              Need help before you book?
            </h3>
            <p className="text-xs text-slate-700">
              This is a beta preview, but in a live version you&apos;d have a
              full help center, safety resources, and real support.
            </p>
          </div>
          <div className="space-y-2">
            <div className="bg-white/80 rounded-2xl border border-slate-200 px-3 py-2">
              <p className="font-semibold text-xs">Help center (mock)</p>
              <p className="text-[11px] text-slate-600">
                Browse FAQs on safety, cancellations, payments, and more.
              </p>
            </div>
            <div className="bg-white/80 rounded-2xl border border-slate-200 px-3 py-2">
              <p className="font-semibold text-xs">Contact us (mock)</p>
              <p className="text-[11px] text-slate-600">
                In a full launch, this would open chat or email with the
                PawNextDoor team.
              </p>
            </div>
          </div>
          <div className="flex md:justify-end">
            <button
              type="button"
              className="px-4 py-2 rounded-full bg-white text-brand.teal border border-brand.teal text-xs font-semibold shadow-soft hover:bg-brand.mint/30"
            >
              View help center (preview)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}


function OwnerSearch({ setTab }) {
  const [sort, setSort] = useState("price-asc");
  const [activeFilters, setActiveFilters] = useState([]);

  const hosts = [
    {
      id: 1,
      name: "Sarah M.",
      address: "Oak Lane • Montgomery, AL",
      price: 48,
      rating: 4.9,
      distance: 0.6,
      tags: ["Big backyard", "Fenced yard", "No other pets"],
    },
    {
      id: 2,
      name: "Jason & Priya",
      address: "Riverbend Drive • Montgomery, AL",
      price: 52,
      rating: 4.8,
      distance: 1.2,
      tags: ["Works from home", "Kid-friendly", "Calm neighborhood"],
    },
    {
      id: 3,
      name: "Emily R.",
      address: "Pine Street • Pike Road, AL",
      price: 44,
      rating: 4.7,
      distance: 3.4,
      tags: ["Big backyard", "Fenced yard", "Quiet street"],
    },
    {
      id: 4,
      name: "Marcus L.",
      address: "Downtown loft • Montgomery, AL",
      price: 55,
      rating: 5.0,
      distance: 0.9,
      tags: ["Indoor only", "Elevator access", "Near dog park"],
    },
  ];

    const filterConfig = [
    {
      key: "fenced",
      label: "Fenced yard",
      matches: (host) =>
        host.tags.some((tag) => tag.toLowerCase().includes("fenced")),
    },
    {
      key: "no-other-pets",
      label: "No other pets",
      matches: (host) =>
        host.tags.some((tag) => tag.toLowerCase().includes("no other pets")),
    },
    {
      key: "big-yard",
      label: "Big backyard",
      matches: (host) =>
        host.tags.some((tag) => tag.toLowerCase().includes("big backyard")),
    },
    {
      key: "wfh",
      label: "Works from home",
      matches: (host) =>
        host.tags.some((tag) => tag.toLowerCase().includes("works from home")),
    },
    {
      key: "kid-friendly",
      label: "Kid-friendly home",
      matches: (host) =>
        host.tags.some((tag) => tag.toLowerCase().includes("kid-friendly")),
    },
    {
      key: "dog-park",
      label: "Near dog park",
      matches: (host) =>
        host.tags.some((tag) => tag.toLowerCase().includes("near dog park")),
    },
  ];

  const sortOptions = [
    { key: "price-asc", label: "Lowest price" },
    { key: "price-desc", label: "Highest price" },
    { key: "rating-desc", label: "Highest rated" },
    { key: "distance-asc", label: "Closest" },
  ];

  const toggleFilter = (key) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const filteredHosts = hosts.filter((host) => {
    if (activeFilters.length === 0) return true; // no filters = show all
    // host must satisfy ALL selected filters
    return activeFilters.every((key) => {
      const cfg = filterConfig.find((f) => f.key === key);
      if (!cfg) return true;
      return cfg.matches(host);
    });
  });

  const sortedHosts = [...filteredHosts].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating-desc") return b.rating - a.rating;
    if (sort === "distance-asc") return a.distance - b.distance;
    return 0;
  });

  return (
    <div className="space-y-4">
      {/* Page heading */}
      <h2 className="text-2xl font-bold text-slate-900">Find a stay</h2>
      <p className="text-slate-600 text-sm">
        Browse nearby hosts matched to your pet’s needs.
      </p>

      {/* Simple search bar at the top (visual only for now) */}
      <div className="grid md:grid-cols-3 gap-3">
        <input
          className="border rounded-lg p-2 text-sm"
          placeholder="City or ZIP"
        />
        <input
          className="border rounded-lg p-2 text-sm"
          placeholder="Dates (flexible)"
        />
        <button
          type="button"
          className="bg-teal-600 text-white rounded-lg p-2 text-sm font-semibold hover:bg-teal-700"
        >
          Search
        </button>
      </div>

      {/* Filter & sort panel */}
      <section className="bg-white/80 border border-slate-200 rounded-2xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-slate-900">
          Filter & sort
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Filters (stackable, bullet/checkbox style) */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-2">
              Filters (select one or more)
            </p>
            <ul className="space-y-1 text-sm text-slate-700">
              {filterConfig.map((f) => (
                <li key={f.key} className="flex items-center gap-2">
                  <input
                    id={`filter-${f.key}`}
                    type="checkbox"
                    checked={activeFilters.includes(f.key)}
                    onChange={() => toggleFilter(f.key)}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  <label
                    htmlFor={`filter-${f.key}`}
                    className="cursor-pointer"
                  >
                    {f.label}
                  </label>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setActiveFilters([])}
              className="mt-2 text-xs text-teal-700 font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>

          {/* Sort by (one choice only) */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-2">
              Sort by (one option)
            </p>
            <ul className="space-y-1 text-sm text-slate-700">
              {sortOptions.map((opt) => (
                <li key={opt.key} className="flex items-center gap-2">
                  <input
                    id={`sort-${opt.key}`}
                    type="radio"
                    name="sort"
                    value={opt.key}
                    checked={sort === opt.key}
                    onChange={() => setSort(opt.key)}
                    className="h-4 w-4 border-slate-300"
                  />
                  <label
                    htmlFor={`sort-${opt.key}`}
                    className="cursor-pointer"
                  >
                    {opt.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Vertical list of cards */}
      <div className="space-y-4">
        {sortedHosts.length === 0 && (
          <p className="text-sm text-slate-500">
            No stays match these filters yet. Try removing one or more filters.
          </p>
        )}

        {sortedHosts.map((host) => (
          <div
            key={host.id}
            className="bg-white border border-teal-100 rounded-2xl p-6 shadow-soft flex flex-col max-w-md mx-auto"
          >
            {/* Header: price + rating */}
            <div className="flex items-start justify-between mb-3">
              <span className="bg-teal-100 text-teal-800 px-3 py-2 rounded-xl text-lg font-bold">
                ${host.price}/night
              </span>
              <span className="bg-amber-100 text-amber-800 px-3 py-2 rounded-xl text-lg font-bold">
                {host.rating.toFixed(1)} ★
              </span>
            </div>

            {/* Host avatar */}
            <div className="mb-3">
              <img
                src={`https://i.pravatar.cc/80?img=${host.id + 10}`}
                className="w-14 h-14 rounded-full shadow"
                alt="Host avatar"
              />
            </div>

            {/* Host name + address + distance */}
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {host.name}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {host.address}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                ~{host.distance.toFixed(1)} miles away
              </p>
            </div>

            {/* Features list */}
            <ul className="mt-4 text-sm text-slate-700 space-y-1 list-disc pl-5">
              {host.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>

            {/* View button */}
            <button
              onClick={() => setTab("listing")}
              className="mt-5 inline-flex text-sm font-semibold text-teal-700 border border-teal-300 rounded-lg px-4 py-2 hover:bg-teal-50 self-start"
            >
              View details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListingDetail({ setTab }) {
  return (
    <Section title="Sarah M. — Cozy Fenced Yard">
      <div className="flex items-center justify-between">
        <span className="text-sm">$48/night</span>
        <button onClick={() => setTab('booking')} className="bg-teal-600 text-white rounded-lg px-4 py-2">Book</button>
      </div>
      <ul className="mt-3 text-gray-700 list-disc pl-5">
        <li>Fully fenced backyard • 2,000 sq ft lawn</li>
        <li>No other pets • Works-from-home</li>
        <li>Max 2 dogs • &gt; 6 months old • house-trained</li>
      </ul>
      <div className="mt-4 grid md:grid-cols-3 gap-3">
        <img className="rounded-xl" src="https://picsum.photos/seed/paw1/640/400"/>
        <img className="rounded-xl" src="https://picsum.photos/seed/paw2/640/400"/>
        <img className="rounded-xl" src="https://picsum.photos/seed/paw3/640/400"/>
      </div>
      <div className="mt-4">
        <div className="text-sm text-gray-600">Availability</div>
        <div className="grid grid-cols-7 gap-2 mt-1 text-center text-sm">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className={`p-2 rounded-md ${i % 3 === 0 ? 'bg-teal-100' : 'bg-gray-100'}`}>{12 + i}</div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function PetProfileForm() {
  return (
    <Section title="Pet Profile">
      <div className="grid md:grid-cols-2 gap-3">
        <input className="border rounded-lg p-2" placeholder="Pet Name"/>
        <select className="border rounded-lg p-2"><option>Dog</option><option>Cat</option></select>
        <input className="border rounded-lg p-2" placeholder="Breed"/>
        <input className="border rounded-lg p-2" placeholder="Weight (lb)"/>
        <select className="border rounded-lg p-2"><option>Temperament: Friendly</option><option>Shy</option><option>Anxious</option><option>High-Energy</option></select>
        <select className="border rounded-lg p-2"><option>Needs Fenced Yard</option><option>No Fence OK</option></select>
        <input className="border rounded-lg p-2" placeholder="Medications (name, dosage)"/>
        <input className="border rounded-lg p-2" placeholder="Vet Clinic & Phone"/>
      </div>
      <div className="mt-4"><PhotoUploader label="Pet Photos" max={4} /></div>
      <button className="mt-3 bg-teal-500 text-white rounded-lg p-2">Save Pet Profile</button>
    </Section>
  );
}

function HostOnboardingForm() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeBackground, setAgreeBackground] = useState(false);

  return (
    <Section title="Become a host">
      {/* Basic host info */}
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Full name
          </label>
          <input
            className="w-full border rounded-lg p-2 text-sm"
            placeholder="Your full legal name"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Email
          </label>
          <input
            className="w-full border rounded-lg p-2 text-sm"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Phone number
          </label>
          <input
            className="w-full border rounded-lg p-2 text-sm"
            placeholder="(555) 555-5555"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Address (for hosting)
          </label>
          <input
            className="w-full border rounded-lg p-2 text-sm"
            placeholder="Street, city, state"
          />
        </div>
      </div>

      {/* Home setup */}
      <div className="mt-4 grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Home type
          </label>
          <select className="w-full border rounded-lg p-2 text-sm">
            <option>House with yard</option>
            <option>House (no yard)</option>
            <option>Apartment / Condo</option>
            <option>Townhome</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Yard / outdoor space
          </label>
          <select className="w-full border rounded-lg p-2 text-sm">
            <option>Fully fenced yard</option>
            <option>Partially fenced yard</option>
            <option>No fence, open space nearby</option>
            <option>No yard</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Other animals in the home
          </label>
          <input
            className="w-full border rounded-lg p-2 text-sm"
            placeholder="e.g., 1 dog, 2 cats, none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Typical schedule
          </label>
          <select className="w-full border rounded-lg p-2 text-sm">
            <option>Work from home most days</option>
            <option>Away 4–6 hours per day</option>
            <option>Away 6+ hours per day</option>
            <option>Mixed / shift schedule</option>
          </select>
        </div>
      </div>

      {/* Pet types / preferences */}
      <div className="mt-6 border-t border-slate-200 pt-4">
        <h3 className="text-sm font-semibold text-slate-900 mb-2">
          What types of pets do you want to host?
        </h3>
        <p className="text-xs text-slate-600 mb-3">
          These preferences help us match you only with pets that fit your
          comfort level and your home.
        </p>

        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1">
              Pet types (you can host)
            </p>
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" className="h-4 w-4" />
                Dogs
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" className="h-4 w-4" />
                Cats
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" className="h-4 w-4" />
                Small animals (rabbits, guinea pigs, etc.)
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" className="h-4 w-4" />
                Open to others (case by case)
              </label>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-600 mb-1">
              Size & energy level
            </p>
            <div className="space-y-1 text-xs">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                Small (0–25 lb)
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                Medium (26–50 lb)
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                Large (51–90 lb)
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                XL / giant breeds (90+ lb)
              </label>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-xs font-semibold text-slate-600 mb-1">
            Pets you do <span className="underline">not</span> accept
          </p>
          <textarea
            className="w-full border rounded-lg p-2 text-xs"
            rows={3}
            placeholder="e.g., no aggressive history, no intact males, no high-energy large breeds, no pets who can jump a 4ft fence, etc."
          />
        </div>
      </div>

      {/* Terms & conditions */}
      <div className="mt-6 border-t border-slate-200 pt-4">
        <h3 className="text-sm font-semibold text-slate-900 mb-2">
          Host terms & conditions (preview)
        </h3>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 max-h-40 overflow-y-auto">
          <p className="text-xs text-slate-600 mb-2">
            This is a beta preview. In a live version, you would see the full
            legal terms for hosting on PawNextDoor. By agreeing, you confirm:
          </p>
          <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
            <li>
              You will provide a safe, reasonably clean environment for any pet
              in your care.
            </li>
            <li>
              You will follow any care instructions provided by the pet’s owner
              (feeding schedule, medications, crate use, etc.).
            </li>
            <li>
              You will immediately notify the owner (and platform, in a real
              launch) if a medical or safety issue arises.
            </li>
            <li>
              You will only accept pets that match the preferences and limits
              you’ve described in your host profile.
            </li>
          </ul>
        </div>

        <label className="mt-3 flex items-start gap-2 text-xs text-slate-700">
          <input
            type="checkbox"
            className="h-4 w-4 mt-0.5"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
          />
          <span>
            I have read and agree to the host terms & conditions for this beta
            preview (mock).
          </span>
        </label>
      </div>

      {/* Background check */}
      <div className="mt-6 border-t border-slate-200 pt-4">
        <h3 className="text-sm font-semibold text-slate-900 mb-2">
          Background check (preview)
        </h3>
        <p className="text-xs text-slate-600 mb-2">
          For a real launch, PawNextDoor would partner with a third-party
          provider to run secure background checks on hosts. This helps protect
          both pets and owners.
        </p>
        <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1 mb-2">
          <li>We would never share your full report with pet owners.</li>
          <li>
            Only a pass/fail style status would appear on your host profile.
          </li>
          <li>
            You would be able to review and dispute results directly with the
            background check provider.
          </li>
        </ul>

        <label className="flex items-start gap-2 text-xs text-slate-700">
          <input
            type="checkbox"
            className="h-4 w-4 mt-0.5"
            checked={agreeBackground}
            onChange={() => setAgreeBackground(!agreeBackground)}
          />
          <span>
            I understand that a background check may be required before hosting
            in a live version of PawNextDoor (mock consent).
          </span>
        </label>
      </div>

      {/* Submit */}
      <button
        type="button"
        disabled={!agreeTerms || !agreeBackground}
        className={
          "mt-6 px-4 py-2 rounded-lg text-sm font-semibold " +
          (agreeTerms && agreeBackground
            ? "bg-teal-600 text-white hover:bg-teal-700"
            : "bg-slate-200 text-slate-500 cursor-not-allowed")
        }
      >
        Submit host application (mock)
      </button>
    </Section>
  );
}

function BookingFlow({ setTab }) {
  return (
    <Section title="Book Your Stay">
      <div className="grid md:grid-cols-3 gap-3">
        <input className="border rounded-lg p-2" placeholder="Check-in (MM/DD)"/>
        <input className="border rounded-lg p-2" placeholder="Check-out (MM/DD)"/>
        <select className="border rounded-lg p-2"><option>Select Pet</option></select>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-gray-700">$48/night × 3 nights</span>
        <span className="font-semibold">Total: $144</span>
      </div>
      <button onClick={() => setTab('payments')} className="mt-3 bg-teal-600 text-white rounded-lg p-2">Continue to Payment</button>
    </Section>
  );
}

function CardField({ placeholder }) { return <input className="border rounded-lg p-2 w-full" placeholder={placeholder} />; }

function PaymentView({ setTab }) {
  const [paid, setPaid] = useState(false);
  const handlePay = () => { setPaid(true); setTimeout(() => setTab('success'), 800); };
  return (
    <Section title="Payment">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-teal-700 font-semibold">Sarah M. — Jun 14–17</div>
          <div className="text-gray-500 text-sm">Booking #BK-10421</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Amount</div>
          <div className="text-xl font-bold">$144.00</div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <CardField placeholder="Name on Card" />
        <CardField placeholder="Email for Receipt" />
        <div className="md:col-span-2 grid grid-cols-4 gap-3">
          <CardField placeholder="Card Number" />
          <CardField placeholder="MM/YY" />
          <CardField placeholder="CVC" />
          <CardField placeholder="ZIP" />
        </div>
      </div>
      <div className="bg-teal-50 border border-teal-100 rounded-xl p-3 text-sm text-gray-700 mt-3">
        <div className="flex items-center justify-between"><span>Subtotal</span><span>$144.00</span></div>
        <div className="flex items-center justify-between"><span>Host payout (est.)</span><span>$122.40</span></div>
      </div>
      <button onClick={handlePay} className={`w-full rounded-lg p-3 mt-3 text-white ${paid ? "bg-teal-300" : "bg-teal-600 hover:bg-teal-700"}`}>{paid ? "Processing…" : "Pay $144.00"}</button>
      <p className="text-xs text-gray-500 text-center mt-2">Cards securely processed (mock). For beta demo only.</p>
    </Section>
  );
}

function SuccessView({ setTab }) {
  return (
    <Section title="Booking Confirmed 🎉">
      <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">
        <div className="text-sm text-gray-600">Confirmation Code</div>
        <div className="text-2xl font-bold text-teal-700">PND-6F2J-94Q</div>
        <div className="text-gray-700 mt-1">You’ll receive an email receipt shortly.</div>
      </div>
      <div className="mt-4 flex gap-3">
        <button onClick={() => setTab('receipts')} className="bg-teal-600 text-white px-4 py-2 rounded-lg">View Receipt</button>
        <button onClick={() => setTab('rate')} className="bg-white border border-teal-300 text-teal-700 px-4 py-2 rounded-lg">Leave a Rating</button>
      </div>
    </Section>
  );
}

function ReceiptsView() {
  const receipts = [
    { id: "RCT-000241", date: "2025-11-12", host: "Sarah M.", nights: 3, total: 144.0, last4: "4242", status: "Paid" },
    { id: "RCT-000197", date: "2025-10-28", host: "Backyard Bungalow", nights: 2, total: 96.0, last4: "1111", status: "Paid" },
  ];
  return (
    <div className="space-y-3">
      {receipts.map((r) => (
        <div key={r.id} className="bg-white border border-teal-100 rounded-2xl p-4 shadow-sm flex items-center justify-between">
<button
  onClick={() => setTab("receipts")}
  className="w-full text-left p-3 border border-slate-200 rounded-lg hover:bg-slate-50"
>
  Payment History / Receipts
</button>

<button
  onClick={() => setTab("payouts")}
  className="w-full text-left p-3 border border-slate-200 rounded-lg hover:bg-slate-50"
>
  Host Earnings & Payouts
</button>
          <div>
            <div className="font-semibold text-teal-700">{r.id} • {r.status}</div>
            <div className="text-gray-600 text-sm">{r.date} • {r.host} • {r.nights} nights • Card •••• {r.last4}</div>
          </div>
          <div className="text-right">
            <div className="font-semibold">${r.total.toFixed(2)}</div>
            <button className="mt-1 text-teal-700 border border-teal-300 rounded-lg px-3 py-1 hover:bg-teal-50">View</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function RatingView() {
  return (
    <Section title="Leave a Rating">
      <div className="flex gap-1 text-2xl">{"★★★★★".split("").map((s,i)=> <span key={i}>★</span>)}</div>
      <div className="mt-3 grid md:grid-cols-3 gap-2 text-sm">
        {['Clean','Caring','Great Yard','Good Updates','On-time','Would Rebook'].map(t=> (
          <label key={t} className="inline-flex items-center gap-2 border rounded-lg px-3 py-2">
            <input type="checkbox"/> <span>{t}</span>
          </label>
        ))}
      </div>
      <textarea className="mt-3 w-full border rounded-lg p-2" rows={4} placeholder="Tell us about your experience (optional)"/>
      <div className="mt-3 flex gap-3">
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg">Submit Review</button>
        <button className="border border-teal-300 text-teal-700 px-4 py-2 rounded-lg">Skip</button>
      </div>
    </Section>
  );
}

function RefundView() {
  return (
    <Section title="Cancel or Request a Refund">
      <div className="text-gray-700">Booking #BK-10421 • Jun 14–17 • $144.00</div>
      <div className="mt-3 grid md:grid-cols-2 gap-3">
        <select className="border rounded-lg p-2">
          <option>Reason: Change of plans</option>
          <option>Host issue</option>
          <option>Pet health</option>
          <option>Other</option>
        </select>
        <select className="border rounded-lg p-2">
          <option>Refund Type: Full (eligible)</option>
          <option>Partial</option>
          <option>Credit</option>
        </select>
      </div>
      <textarea className="mt-3 w-full border rounded-lg p-2" rows={3} placeholder="Add details (optional)"/>
      <div className="mt-3 flex gap-3">
        <button className="bg-white border border-teal-300 text-teal-700 px-4 py-2 rounded-lg">Cancel Booking</button>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg">Submit Refund Request</button>
      </div>
      <p className="text-xs text-gray-500 mt-2">Beta policy: full refund for cancellations &gt; 24h before check‑in; otherwise partial.</p>
    </Section>
  );
}

function HostDashboard() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Section title="Earnings (after fees)">
        <div className="text-3xl font-bold text-teal-700">$1,240</div>
        <div className="text-gray-600">This month</div>
      </Section>
      <Section title="Bookings">
        <div className="text-3xl font-bold text-teal-700">14</div>
        <div className="text-gray-600">Completed</div>
      </Section>
      <Section title="Rating">
        <div className="text-3xl font-bold text-teal-700">4.9</div>
        <div className="text-gray-600">Avg. last 30 days</div>
      </Section>
    </div>
  );
}

function NotificationsView() {
  const items = [
    { t: "New message from Sarah", time: "2m" },
    { t: "Booking confirmed • PND-6F2J-94Q", time: "10m" },
    { t: "Payout sent • $122.40", time: "1d" },
  ];
  return (
    <Section title="Notifications">
      <div className="divide-y">
        {items.map((i,idx)=>(
          <div key={idx} className="py-3 flex items-center justify-between">
            <div className="text-gray-700">{i.t}</div>
            <div className="text-xs text-gray-500">{i.time}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SettingsView({ setTab }) {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [petSizePreference, setPetSizePreference] = useState("any");
  const [hostMode, setHostMode] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="bg-white/80 border border-slate-200 rounded-2xl p-6 space-y-6 shadow-soft">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Settings</h2>
          <p className="text-sm text-slate-600">
            Manage your account, notifications, and preferences.
          </p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100">
          Beta account
        </span>
      </div>

      {/* Top navigation links */}
            {/* Top navigation links */}
      <nav className="flex flex-wrap gap-2 text-xs sm:text-sm border border-slate-200 rounded-xl p-2 bg-slate-50/60">
        <button
          type="button"
          onClick={() => scrollToSection("settings-account")}
          className="px-3 py-1.5 rounded-lg text-slate-700 hover:bg-white border border-transparent hover:border-slate-200"
        >
          Account
        </button>
        <button
          type="button"
          onClick={() => scrollToSection("settings-notifications")}
          className="px-3 py-1.5 rounded-lg text-slate-700 hover:bg-white border border-transparent hover:border-slate-200"
        >
          Notifications
        </button>
        <button
          type="button"
          onClick={() => scrollToSection("settings-preferences")}
          className="px-3 py-1.5 rounded-lg text-slate-700 hover:bg-white border border-transparent hover:border-slate-200"
        >
          Preferences
        </button>
        <button
          type="button"
          onClick={() => scrollToSection("settings-payout")}
          className="px-3 py-1.5 rounded-lg text-slate-700 hover:bg-white border border-transparent hover:border-slate-200"
        >
          Payout details
        </button>
        <button
          type="button"
          onClick={() => scrollToSection("settings-payments")}
          className="px-3 py-1.5 rounded-lg text-slate-700 hover:bg-white border border-transparent hover:border-slate-200"
        >
          Payments &amp; history
        </button>
        <button
          type="button"
          onClick={() => scrollToSection("settings-help")}
          className="px-3 py-1.5 rounded-lg text-slate-700 hover:bg-white border border-transparent hover:border-slate-200"
        >
          Help center
        </button>
      </nav>


      {/* Account section */}
      <div
        id="settings-account"
        className="border border-slate-200 rounded-xl p-4 space-y-3"
      >
        <h3 className="text-sm font-semibold text-slate-900">Account</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Full name
            </label>
            <input
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
              placeholder="Your name"
              defaultValue="Ty Powell"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Email
            </label>
            <input
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
              placeholder="you@example.com"
              defaultValue="you@example.com"
            />
          </div>
        </div>
        <button
          type="button"
          className="text-xs text-teal-700 font-semibold hover:underline"
        >
          Change password
        </button>
      </div>

      {/* Notifications */}
      <div
        id="settings-notifications"
        className="border border-slate-200 rounded-xl p-4 space-y-3"
      >
        <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
        <p className="text-xs text-slate-600">
          Choose how you want to hear about bookings, messages, and updates.
        </p>

        <div className="space-y-2 text-sm text-slate-800">
          <label className="flex items-center justify-between gap-3">
            <span>Email alerts</span>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={() => setEmailAlerts(!emailAlerts)}
              className="h-4 w-4"
            />
          </label>

          <label className="flex items-center justify-between gap-3">
            <span>SMS alerts</span>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={() => setSmsAlerts(!smsAlerts)}
              className="h-4 w-4"
            />
          </label>

          <label className="flex items-center justify-between gap-3">
            <span>Push notifications</span>
            <input
              type="checkbox"
              checked={pushAlerts}
              onChange={() => setPushAlerts(!pushAlerts)}
              className="h-4 w-4"
            />
          </label>
        </div>
      </div>

      {/* Preferences */}
      <div
        id="settings-preferences"
        className="border border-slate-200 rounded-xl p-4 space-y-4"
      >
        <h3 className="text-sm font-semibold text-slate-900">
          Pet & host preferences
        </h3>

        <div className="grid gap-3 sm:grid-cols-2 text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Preferred pet size
            </label>
            <select
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
              value={petSizePreference}
              onChange={(e) => setPetSizePreference(e.target.value)}
            >
              <option value="any">Any size</option>
              <option value="small">Small (0–25 lb)</option>
              <option value="medium">Medium (26–50 lb)</option>
              <option value="large">Large (51–90 lb)</option>
              <option value="xl">XL (90+ lb)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Host mode
            </label>
            <div className="flex items-center justify-between border border-slate-200 rounded-lg px-3 py-2">
              <span className="text-sm text-slate-800">
                {hostMode ? "Hosting enabled" : "Hosting off"}
              </span>
              <input
                type="checkbox"
                checked={hostMode}
                onChange={() => setHostMode(!hostMode)}
                className="h-4 w-4"
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          These preferences help us match you with better homes (as an owner)
          or better pets (as a host) in future versions.
        </p>
      </div>

      {/* Payout details */}
      <div
        id="settings-payout"
        className="border border-slate-200 rounded-xl p-4 space-y-3"
      >
        <h3 className="text-sm font-semibold text-slate-900">
          Payout details (host)
        </h3>
        <p className="text-xs text-slate-600">
          In a live version, this is where we’d securely store how you get paid
          for completed stays.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Payout method
            </label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
              <option>Not set (mock)</option>
              <option>Bank transfer</option>
              <option>PayPal</option>
              <option>Venmo</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Payout name
            </label>
            <input
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
              placeholder="Name on account"
            />
          </div>
        </div>

        <button
          type="button"
          className="text-xs text-teal-700 font-semibold hover:underline"
        >
          Verify payout details (mock)
        </button>
      </div>
      {/* Payments & history */}
      <div
        id="settings-payments"
        className="border border-slate-200 rounded-xl p-4 space-y-3"
      >
        <h3 className="text-sm font-semibold text-slate-900">
          Payments & history
        </h3>
        <p className="text-xs text-slate-600">
          View past bookings, payments, and receipts for both owners and hosts.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 text-sm">
          <button
            type="button"
            onClick={() => setTab("receipts")}
            className="w-full text-left p-3 border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            Owner payment history & receipts
            <p className="text-xs text-slate-500">
              See charges, dates, and download-style receipts (mock).
            </p>
          </button>

          <button
            type="button"
            onClick={() => setTab("dashboard")}
            className="w-full text-left p-3 border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            Host earnings & payouts
            <p className="text-xs text-slate-500">
              View your host dashboard, upcoming payouts, and past stays.
            </p>
          </button>
        </div>
      </div>

      {/* Help center */}
      <div
        id="settings-help"
        className="border border-slate-200 rounded-xl p-4 space-y-3"
      >
        <h3 className="text-sm font-semibold text-slate-900">Help center</h3>
        <p className="text-xs text-slate-600">
          Quick answers for common questions during the beta.
        </p>

        <ul className="space-y-2 text-sm text-slate-800">
          <li>
            <span className="font-semibold">• How do ratings work?</span>
            <p className="text-xs text-slate-600">
              In this preview, ratings are sample data only. In a real launch,
              both hosts and owners could rate each stay.
            </p>
          </li>
          <li>
            <span className="font-semibold">• Is my pet covered?</span>
            <p className="text-xs text-slate-600">
              This mock does not include real insurance yet. For a live product,
              we’d show clear coverage details here.
            </p>
          </li>
          <li>
            <span className="font-semibold">• How do cancellations work?</span>
            <p className="text-xs text-slate-600">
              Future versions would let you choose a flexible, moderate, or
              strict cancellation policy and view it here.
            </p>
          </li>
        </ul>

        <button
          type="button"
          className="text-xs text-teal-700 font-semibold hover:underline"
        >
          Contact support (mock)
        </button>
      </div>

      {/* Danger zone */}
      <div
        id="settings-danger"
        className="border border-red-100 rounded-xl p-4 space-y-2 bg-red-50/60"
      >
        <h3 className="text-sm font-semibold text-red-700">Danger zone</h3>
        <p className="text-xs text-red-700">
          In a real app, this would let you deactivate your account and remove
          your data. For this beta preview, this is just a visual mock.
        </p>
        <button
          type="button"
          className="inline-flex items-center text-xs font-semibold text-red-700 border border-red-300 rounded-lg px-3 py-1.5 hover:bg-red-100"
        >
          Deactivate account (mock)
        </button>
      </div>
    </section>
  );
}

function LoginView({ setTab }) {
  return (
    <section className="bg-white/80 border border-slate-200 rounded-2xl p-6 shadow-soft max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold text-slate-900">Log in</h2>
      <p className="text-sm text-slate-600">
        This is a mock login screen for the PawNextDoor beta preview.
      </p>

      <div className="space-y-3 text-sm">
        <input
          className="w-full border border-slate-200 rounded-lg px-3 py-2"
          placeholder="Email"
        />
        <input
          className="w-full border border-slate-200 rounded-lg px-3 py-2"
          placeholder="Password"
          type="password"
        />
      </div>

      <button
        type="button"
        onClick={() => setTab("landing")}
        className="w-full mt-2 bg-teal-700 text-white py-2 rounded-lg font-semibold hover:bg-teal-800"
      >
        Continue (mock)
      </button>

      <p className="text-xs text-slate-500">
        In a live version, this would connect to a real authentication system.
      </p>
    </section>
  );
}


export default function App() {
  const [tab, setTab] = useState("landing");
const isActive = (id) => tab === id ? "text-brand.teal underline decoration-2 transition-all duration-150" : "text-brand.teal/70 hover:underline transition-all duration-150";
const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-brand.mint/60 to-white text-brand.ink">

           <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-brand.mint shadow-soft">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-4 py-3">
          {/* Left: logo + name */}
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="PawNextDoor logo"
              className="w-9 h-9 rounded-lg object-contain"
            />
            <span className="text-lg font-bold text-brand.ink tracking-tight">
              PawNextDoor
            </span>
          </div>

          {/* Center: main nav (desktop) */}
          <nav className="hidden md:flex items-center gap-2 text-sm">
            <button
              type="button"
              onClick={() => setTab("landing")}
              className="px-3 py-1.5 rounded-full hover:bg-brand.mint/50 text-slate-800"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => setTab("owner")}
              className="px-3 py-1.5 rounded-full hover:bg-brand.mint/50 text-slate-800"
            >
              Find a stay
            </button>
            <button
              type="button"
              onClick={() => setTab("host")}
              className="px-3 py-1.5 rounded-full hover:bg-brand.mint/50 text-slate-800"
            >
              Become a host
            </button>
            <button
              type="button"
              onClick={() => setTab("pet")}
              className="px-3 py-1.5 rounded-full hover:bg-brand.mint/50 text-slate-800"
            >
              Pet profile
            </button>
            <button
              type="button"
              onClick={() => setTab("dashboard")}
              className="px-3 py-1.5 rounded-full hover:bg-brand.mint/50 text-slate-800"
            >
              Host dashboard
            </button>
            <button
              type="button"
              onClick={() => setTab("settings")}
              className="px-3 py-1.5 rounded-full hover:bg-brand.mint/50 text-slate-800"
            >
              Settings
            </button>
          </nav>

          {/* Right: login button */}
          <div className="flex items-center gap-2">
            <button
             type="button"
             onClick={() => setTab("login")}
             className="px-4 py-1.5 rounded-full border border-brand.teal text-brand.teal text-sm font-semibold hover:bg-brand.mint/40 bg-white"
>
  Log in
</button>
          </div>
        </div>
      </header>

     <main className="flex-1 max-w-6xl mx-auto px-4 py-6 space-y-6">
        {tab === "landing" && <Landing setTab={setTab} />}
        {tab === "owner" && <OwnerSearch setTab={setTab} />}
        {tab === "listing" && <ListingDetail setTab={setTab} />}
        {tab === "pet" && <PetProfileForm />}
        {tab === "host" && <HostOnboardingForm />}
        {tab === "booking" && <BookingFlow setTab={setTab} />}
        {tab === "payments" && <PaymentView setTab={setTab} />}
        {tab === "success" && <SuccessView setTab={setTab} />}
        {tab === "rate" && <RatingView />}
        {tab === "refund" && <RefundView />}
        {tab === "dashboard" && <HostDashboard />}
        {tab === "notifications" && <NotificationsView />}
        {tab === "login" && <LoginView setTab={setTab} />}
        {tab === "settings" && <SettingsView setTab={setTab} />}
      </main>
<footer className="border-t border-brand.mint/80 bg-brand.mint/50 backdrop-blur text-center py-6 text-sm text-brand.ink/80">© 2025 PawNextDoor — Neighborhood homes for happy pets.</footer>

    </div>
  );
}
