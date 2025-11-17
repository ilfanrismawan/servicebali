'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ContentData {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    image?: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  stats?: {
    title: string;
    subtitle: string;
    items: Array<{
      number: string;
      label: string;
      icon: string;
    }>;
  };
  pricing?: {
    title: string;
    subtitle: string;
    note: string;
    categories: Array<{
      name: string;
      items: Array<{
        service: string;
        price: string;
        warranty: string;
      }>;
    }>;
  };
  locations: {
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      description: string;
      address?: string;
      phone?: string;
      hours?: string;
      mapUrl?: string;
      latitude?: number;
      longitude?: number;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    whatsapp: string;
    message: string;
  };
  about: {
    title: string;
    description: string;
    image?: string;
  };
  whyChooseUs?: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  process?: {
    title: string;
    subtitle: string;
    steps: Array<{
      step: number;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  testimonials?: {
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      location: string;
      rating: number;
      comment: string;
      image: string;
    }>;
  };
  gallery?: {
    title: string;
    subtitle: string;
    images: Array<{
      url: string;
      caption: string;
    }>;
  };
  faq?: {
    title: string;
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [content, setContent] = useState<ContentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Simple password check (in production, use proper authentication)
  const ADMIN_PASSWORD = 'admin123'; // Change this to a secure password

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadContent();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      loadContent();
    } else {
      alert('Password salah!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setPassword('');
  };

  const loadContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Error loading content:', error);
      alert('Gagal memuat konten');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;

    setIsSaving(true);
    setSaveMessage(null);

    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        setSaveMessage({ type: 'success', text: 'Konten berhasil disimpan!' });
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      setSaveMessage({ type: 'error', text: 'Gagal menyimpan konten' });
      setTimeout(() => setSaveMessage(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const updateContent = (path: string[], value: any) => {
    if (!content) return;

    const newContent = { ...content };
    let current: any = newContent;

    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }

    current[path[path.length - 1]] = value;
    setContent(newContent);
  };

  const addServiceItem = () => {
    if (!content) return;
    const newItems = [...content.services.items, { title: '', description: '', icon: '📱' }];
    updateContent(['services', 'items'], newItems);
  };

  const removeServiceItem = (index: number) => {
    if (!content) return;
    const newItems = content.services.items.filter((_, i) => i !== index);
    updateContent(['services', 'items'], newItems);
  };

  const addLocationItem = () => {
    if (!content) return;
    const newItems = [...content.locations.items, { name: '', description: '' }];
    updateContent(['locations', 'items'], newItems);
  };

  const removeLocationItem = (index: number) => {
    if (!content) return;
    const newItems = content.locations.items.filter((_, i) => i !== index);
    updateContent(['locations', 'items'], newItems);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isLoading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CMS Admin Panel</h1>
              <p className="text-gray-600 mt-1">Edit konten landing page</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Lihat Website
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              saveMessage.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {saveMessage.text}
          </div>
        )}

        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e: any) => updateContent(['hero', 'title'], e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <textarea
                value={content.hero.subtitle}
                onChange={(e: any) => updateContent(['hero', 'subtitle'], e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Text</label>
              <input
                type="text"
                value={content.hero.cta}
                onChange={(e: any) => updateContent(['hero', 'cta'], e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image URL</label>
              <input
                type="text"
                value={content.hero.image || ''}
                onChange={(e: any) => updateContent(['hero', 'image'], e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">Masukkan URL gambar untuk background hero section</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Kami</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={content.about.title}
                onChange={(e: any) => updateContent(['about', 'title'], e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={content.about.description}
                onChange={(e: any) => updateContent(['about', 'description'], e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">About Image URL</label>
              <input
                type="text"
                value={content.about.image || ''}
                onChange={(e: any) => updateContent(['about', 'image'], e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">Masukkan URL gambar untuk section tentang kami</p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Layanan</h2>
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={content.services.title}
                onChange={(e: any) => updateContent(['services', 'title'], e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={content.services.subtitle}
                onChange={(e: any) => updateContent(['services', 'subtitle'], e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="space-y-4">
            {content.services.items.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900">Layanan {index + 1}</h3>
                  <button
                    onClick={() => removeServiceItem(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Hapus
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon (emoji)</label>
                    <input
                      type="text"
                      value={item.icon}
                      onChange={(e: any) => {
                        const newItems = [...content.services.items];
                        newItems[index].icon = e.target.value;
                        updateContent(['services', 'items'], newItems);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="📱"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e: any) => {
                        const newItems = [...content.services.items];
                        newItems[index].title = e.target.value;
                        updateContent(['services', 'items'], newItems);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={item.description}
                      onChange={(e: any) => {
                        const newItems = [...content.services.items];
                        newItems[index].description = e.target.value;
                        updateContent(['services', 'items'], newItems);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addServiceItem}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              + Tambah Layanan
            </button>
          </div>
        </div>

        {/* Stats Section */}
        {content.stats && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistik</h2>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.stats.title}
                  onChange={(e: any) => updateContent(['stats', 'title'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={content.stats.subtitle}
                  onChange={(e: any) => updateContent(['stats', 'subtitle'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="space-y-4">
              {content.stats.items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900">Statistik {index + 1}</h3>
                    <button
                      onClick={() => {
                        const newItems = content.stats!.items.filter((_, i) => i !== index);
                        updateContent(['stats', 'items'], newItems);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Icon (emoji)</label>
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e: any) => {
                          const newItems = [...content.stats!.items];
                          newItems[index].icon = e.target.value;
                          updateContent(['stats', 'items'], newItems);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Angka</label>
                      <input
                        type="text"
                        value={item.number}
                        onChange={(e: any) => {
                          const newItems = [...content.stats!.items];
                          newItems[index].number = e.target.value;
                          updateContent(['stats', 'items'], newItems);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="500+"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e: any) => {
                          const newItems = [...content.stats!.items];
                          newItems[index].label = e.target.value;
                          updateContent(['stats', 'items'], newItems);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Handphone Diperbaiki"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newItems = [...(content.stats?.items || []), { number: '', label: '', icon: '📱' }];
                  updateContent(['stats', 'items'], newItems);
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                + Tambah Statistik
              </button>
            </div>
          </div>
        )}

        {/* Pricing Section */}
        {content.pricing && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Daftar Harga</h2>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.pricing.title}
                  onChange={(e: any) => updateContent(['pricing', 'title'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={content.pricing.subtitle}
                  onChange={(e: any) => updateContent(['pricing', 'subtitle'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catatan</label>
                <textarea
                  value={content.pricing.note}
                  onChange={(e: any) => updateContent(['pricing', 'note'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
              </div>
            </div>
            <div className="space-y-6">
              {content.pricing.categories.map((category, catIndex) => (
                <div key={catIndex} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-900">Kategori {catIndex + 1}</h3>
                    <button
                      onClick={() => {
                        const newCategories = content.pricing!.categories.filter((_, i) => i !== catIndex);
                        updateContent(['pricing', 'categories'], newCategories);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Hapus Kategori
                    </button>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kategori</label>
                      <input
                        type="text"
                        value={category.name}
                        onChange={(e: any) => {
                          const newCategories = [...content.pricing!.categories];
                          newCategories[catIndex].name = e.target.value;
                          updateContent(['pricing', 'categories'], newCategories);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="border border-gray-200 rounded p-3 bg-gray-50">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-sm font-medium text-gray-700">Item {itemIndex + 1}</h4>
                            <button
                              onClick={() => {
                                const newCategories = [...content.pricing!.categories];
                                newCategories[catIndex].items = newCategories[catIndex].items.filter((_, i) => i !== itemIndex);
                                updateContent(['pricing', 'categories'], newCategories);
                              }}
                              className="text-red-600 hover:text-red-800 text-xs"
                            >
                              Hapus
                            </button>
                          </div>
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={item.service}
                              onChange={(e: any) => {
                                const newCategories = [...content.pricing!.categories];
                                newCategories[catIndex].items[itemIndex].service = e.target.value;
                                updateContent(['pricing', 'categories'], newCategories);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                              placeholder="Nama Layanan"
                            />
                            <input
                              type="text"
                              value={item.price}
                              onChange={(e: any) => {
                                const newCategories = [...content.pricing!.categories];
                                newCategories[catIndex].items[itemIndex].price = e.target.value;
                                updateContent(['pricing', 'categories'], newCategories);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                              placeholder="Harga"
                            />
                            <input
                              type="text"
                              value={item.warranty}
                              onChange={(e: any) => {
                                const newCategories = [...content.pricing!.categories];
                                newCategories[catIndex].items[itemIndex].warranty = e.target.value;
                                updateContent(['pricing', 'categories'], newCategories);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                              placeholder="Garansi"
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newCategories = [...content.pricing!.categories];
                          newCategories[catIndex].items.push({ service: '', price: '', warranty: '' });
                          updateContent(['pricing', 'categories'], newCategories);
                        }}
                        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors text-sm"
                      >
                        + Tambah Item
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newCategories = [...(content.pricing?.categories || []), { name: '', items: [] }];
                  updateContent(['pricing', 'categories'], newCategories);
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                + Tambah Kategori
              </button>
            </div>
          </div>
        )}

        {/* Locations Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lokasi</h2>
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={content.locations.title}
                onChange={(e: any) => updateContent(['locations', 'title'], e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={content.locations.subtitle}
                onChange={(e: any) => updateContent(['locations', 'subtitle'], e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="space-y-4">
            {content.locations.items.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900">Lokasi {index + 1}</h3>
                  <button
                    onClick={() => removeLocationItem(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Hapus
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lokasi</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e: any) => {
                        const newItems = [...content.locations.items];
                        newItems[index].name = e.target.value;
                        updateContent(['locations', 'items'], newItems);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={item.description}
                      onChange={(e: any) => {
                        const newItems = [...content.locations.items];
                        newItems[index].description = e.target.value;
                        updateContent(['locations', 'items'], newItems);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                    <input
                      type="text"
                      value={item.address || ''}
                      onChange={(e: any) => {
                        const newItems = [...content.locations.items];
                        newItems[index].address = e.target.value;
                        updateContent(['locations', 'items'], newItems);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
                    <input
                      type="text"
                      value={item.phone || ''}
                      onChange={(e: any) => {
                        const newItems = [...content.locations.items];
                        newItems[index].phone = e.target.value;
                        updateContent(['locations', 'items'], newItems);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jam Operasional</label>
                    <input
                      type="text"
                      value={item.hours || ''}
                      onChange={(e: any) => {
                        const newItems = [...content.locations.items];
                        newItems[index].hours = e.target.value;
                        updateContent(['locations', 'items'], newItems);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Senin - Minggu: 09:00 - 18:00 WITA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Embed URL</label>
                    <input
                      type="text"
                      value={item.mapUrl || ''}
                      onChange={(e: any) => {
                        const newItems = [...content.locations.items];
                        newItems[index].mapUrl = e.target.value;
                        updateContent(['locations', 'items'], newItems);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="https://www.google.com/maps/embed?pb=..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Dapatkan dari Google Maps → Share → Embed a map</p>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addLocationItem}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              + Tambah Lokasi
            </button>
          </div>
        </div>

        {/* Why Choose Us Section */}
        {content.whyChooseUs && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mengapa Pilih Kami</h2>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.whyChooseUs.title}
                  onChange={(e: any) => updateContent(['whyChooseUs', 'title'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={content.whyChooseUs.subtitle}
                  onChange={(e: any) => updateContent(['whyChooseUs', 'subtitle'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="space-y-4">
              {content.whyChooseUs.items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900">Item {index + 1}</h3>
                    <button
                      onClick={() => {
                        const newItems = content.whyChooseUs!.items.filter((_, i) => i !== index);
                        updateContent(['whyChooseUs', 'items'], newItems);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Icon (emoji)</label>
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e: any) => {
                          const newItems = [...content.whyChooseUs!.items];
                          newItems[index].icon = e.target.value;
                          updateContent(['whyChooseUs', 'items'], newItems);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e: any) => {
                          const newItems = [...content.whyChooseUs!.items];
                          newItems[index].title = e.target.value;
                          updateContent(['whyChooseUs', 'items'], newItems);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={item.description}
                        onChange={(e: any) => {
                          const newItems = [...content.whyChooseUs!.items];
                          newItems[index].description = e.target.value;
                          updateContent(['whyChooseUs', 'items'], newItems);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newItems = [...(content.whyChooseUs?.items || []), { title: '', description: '', icon: '✅' }];
                  updateContent(['whyChooseUs', 'items'], newItems);
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                + Tambah Item
              </button>
            </div>
          </div>
        )}

        {/* Process Section */}
        {content.process && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Proses Kerja</h2>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.process.title}
                  onChange={(e: any) => updateContent(['process', 'title'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={content.process.subtitle}
                  onChange={(e: any) => updateContent(['process', 'subtitle'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="space-y-4">
              {content.process.steps.map((step, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900">Step {step.step}</h3>
                    <button
                      onClick={() => {
                        const newSteps = content.process!.steps.filter((_, i) => i !== index);
                        updateContent(['process', 'steps'], newSteps);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Step Number</label>
                      <input
                        type="number"
                        value={step.step}
                        onChange={(e: any) => {
                          const newSteps = [...content.process!.steps];
                          newSteps[index].step = parseInt(e.target.value);
                          updateContent(['process', 'steps'], newSteps);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Icon (emoji)</label>
                      <input
                        type="text"
                        value={step.icon}
                        onChange={(e: any) => {
                          const newSteps = [...content.process!.steps];
                          newSteps[index].icon = e.target.value;
                          updateContent(['process', 'steps'], newSteps);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e: any) => {
                          const newSteps = [...content.process!.steps];
                          newSteps[index].title = e.target.value;
                          updateContent(['process', 'steps'], newSteps);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={step.description}
                        onChange={(e: any) => {
                          const newSteps = [...content.process!.steps];
                          newSteps[index].description = e.target.value;
                          updateContent(['process', 'steps'], newSteps);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newSteps = [...(content.process?.steps || []), { step: (content.process?.steps.length || 0) + 1, title: '', description: '', icon: '💬' }];
                  updateContent(['process', 'steps'], newSteps);
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                + Tambah Step
              </button>
            </div>
          </div>
        )}

        {/* Testimonials Section */}
        {content.testimonials && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Testimoni</h2>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.testimonials.title}
                  onChange={(e: any) => updateContent(['testimonials', 'title'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={content.testimonials.subtitle}
                  onChange={(e: any) => updateContent(['testimonials', 'subtitle'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="space-y-4">
              {content.testimonials.items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900">Testimoni {index + 1}</h3>
                    <button
                      onClick={() => {
                        const newItems = content.testimonials!.items.filter((_, i) => i !== index);
                        updateContent(['testimonials', 'items'], newItems);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e: any) => {
                          const newItems = [...content.testimonials!.items];
                          newItems[index].name = e.target.value;
                          updateContent(['testimonials', 'items'], newItems);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                      <input
                        type="text"
                        value={item.location}
                        onChange={(e: any) => {
                          const newItems = [...content.testimonials!.items];
                          newItems[index].location = e.target.value;
                          updateContent(['testimonials', 'items'], newItems);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={item.rating}
                        onChange={(e: any) => {
                          const newItems = [...content.testimonials!.items];
                          newItems[index].rating = parseInt(e.target.value);
                          updateContent(['testimonials', 'items'], newItems);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Komentar</label>
                      <textarea
                        value={item.comment}
                        onChange={(e: any) => {
                          const newItems = [...content.testimonials!.items];
                          newItems[index].comment = e.target.value;
                          updateContent(['testimonials', 'items'], newItems);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={item.image}
                        onChange={(e: any) => {
                          const newItems = [...content.testimonials!.items];
                          newItems[index].image = e.target.value;
                          updateContent(['testimonials', 'items'], newItems);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newItems = [...(content.testimonials?.items || []), { name: '', location: '', rating: 5, comment: '', image: '' }];
                  updateContent(['testimonials', 'items'], newItems);
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                + Tambah Testimoni
              </button>
            </div>
          </div>
        )}

        {/* Gallery Section */}
        {content.gallery && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Galeri</h2>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.gallery.title}
                  onChange={(e: any) => updateContent(['gallery', 'title'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={content.gallery.subtitle}
                  onChange={(e: any) => updateContent(['gallery', 'subtitle'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="space-y-4">
              {content.gallery.images.map((image, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900">Gambar {index + 1}</h3>
                    <button
                      onClick={() => {
                        const newImages = content.gallery!.images.filter((_, i) => i !== index);
                        updateContent(['gallery', 'images'], newImages);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={image.url}
                        onChange={(e: any) => {
                          const newImages = [...content.gallery!.images];
                          newImages[index].url = e.target.value;
                          updateContent(['gallery', 'images'], newImages);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                      <input
                        type="text"
                        value={image.caption}
                        onChange={(e: any) => {
                          const newImages = [...content.gallery!.images];
                          newImages[index].caption = e.target.value;
                          updateContent(['gallery', 'images'], newImages);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newImages = [...(content.gallery?.images || []), { url: '', caption: '' }];
                  updateContent(['gallery', 'images'], newImages);
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                + Tambah Gambar
              </button>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {content.faq && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ</h2>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.faq.title}
                  onChange={(e: any) => updateContent(['faq', 'title'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={content.faq.subtitle}
                  onChange={(e: any) => updateContent(['faq', 'subtitle'], e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="space-y-4">
              {content.faq.items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900">FAQ {index + 1}</h3>
                    <button
                      onClick={() => {
                        const newItems = content.faq!.items.filter((_, i) => i !== index);
                        updateContent(['faq', 'items'], newItems);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pertanyaan</label>
                      <input
                        type="text"
                        value={item.question}
                        onChange={(e: any) => {
                          const newItems = [...content.faq!.items];
                          newItems[index].question = e.target.value;
                          updateContent(['faq', 'items'], newItems);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Jawaban</label>
                      <textarea
                        value={item.answer}
                        onChange={(e: any) => {
                          const newItems = [...content.faq!.items];
                          newItems[index].answer = e.target.value;
                          updateContent(['faq', 'items'], newItems);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newItems = [...(content.faq?.items || []), { question: '', answer: '' }];
                  updateContent(['faq', 'items'], newItems);
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                + Tambah FAQ
              </button>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Kontak</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={content.contact.title}
                onChange={(e: any) => updateContent(['contact', 'title'], e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={content.contact.subtitle}
                onChange={(e: any) => updateContent(['contact', 'subtitle'], e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nomor WhatsApp</label>
              <input
                type="text"
                value={content.contact.whatsapp}
                onChange={(e: any) => updateContent(['contact', 'whatsapp'], e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pesan WhatsApp Default</label>
              <textarea
                value={content.contact.message}
                onChange={(e: any) => updateContent(['contact', 'message'], e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="bg-white rounded-lg shadow-md p-6 sticky bottom-0">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>
    </div>
  );
}

