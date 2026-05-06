import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { detailedTours, DetailedTour } from '@/data/toursData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/components/Layout/AdminLayout';
import { X, Plus, Upload, Image as ImageIcon, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

type FormData = Omit<DetailedTour, 'id' | 'slug'>;

export default function AdminTourFormPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const isEdit = id && id !== 'new';
  const tour = isEdit ? detailedTours.find((t) => t.id === parseInt(id)) : null;

  const [uploadedImages, setUploadedImages] = useState<{ [k: string]: string[] }>({
    main: tour?.image ? [tour.image] : [],
    gallery: tour?.gallery || [],
  });

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    basic: true,
    pricing: true,
    media: true,
    details: false,
    highlights: false,
    included: false,
    excluded: false,
    departures: false,
    itinerary: false,
    faq: false,
  });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    defaultValues: tour || {
      title: '',
      shortDescription: '',
      fullDescription: '',
      category: 'group',
      duration: '',
      durationHours: 8,
      durationDays: undefined,
      price: 0,
      priceNote: 'per person',
      originalPrice: undefined,
      image: '',
      gallery: [],
      rating: 4.5,
      reviewCount: 0,
      maxGroupSize: 12,
      minGroupSize: 2,
      languages: ['English'],
      difficulty: 'easy',
      pickupIncluded: true,
      meetingPoint: '',
      departures: [],
      highlights: [],
      included: [],
      excluded: [],
      itinerary: [],
      faq: [],
      tags: [],
      badge: '',
      region: '',
      startingPoint: '',
    },
  });

  const { control, handleSubmit, setValue, watch } = form;
  const image = watch('image');

  const { fields: galleryFields,   append: appendGallery,   remove: removeGallery }   = useFieldArray({ control, name: 'gallery' as any });
  const { fields: departureFields, append: appendDeparture, remove: removeDeparture } = useFieldArray({ control, name: 'departures' });
  const { fields: itineraryFields, append: appendItinerary, remove: removeItinerary } = useFieldArray({ control, name: 'itinerary' });
  const { fields: faqFields,       append: appendFaq,       remove: removeFaq }       = useFieldArray({ control, name: 'faq' });
  const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({ control, name: 'highlights' as any });
  const { fields: includedFields,  append: appendIncluded,  remove: removeIncluded }  = useFieldArray({ control, name: 'included' as any });
  const { fields: excludedFields,  append: appendExcluded,  remove: removeExcluded }  = useFieldArray({ control, name: 'excluded' as any });
  const { fields: languageFields,  append: appendLanguage,  remove: removeLanguage }  = useFieldArray({ control, name: 'languages' as any });
  const { fields: tagFields,       append: appendTag,       remove: removeTag }       = useFieldArray({ control, name: 'tags' as any });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'main' | 'gallery') => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          setUploadedImages((prev) => ({ ...prev, [field]: [...(prev[field] || []), dataUrl] }));
          if (field === 'main') setValue('image', dataUrl);
          else appendGallery(dataUrl as any);
        };
        reader.readAsDataURL(file);
      });
    }
    if (field === 'main') imageInputRef.current!.value = '';
    if (field === 'gallery') galleryInputRef.current!.value = '';
  };

  const onSubmit = (data: FormData) => {
    console.log('Tour saved:', data);
    router.push('/admin/tours');
  };

  const toggle = (section: string) =>
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));

  const SectionCard = ({ title, section, children }: { title: string; section: string; children: React.ReactNode }) => (
    <Card>
      <button
        type="button"
        onClick={() => toggle(section)}
        className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
      >
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        {expanded[section] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {expanded[section] && <CardContent className="pt-0 pb-6">{children}</CardContent>}
    </Card>
  );

  return (
    <AdminLayout>
      <div className="space-y-6 pb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{isEdit ? 'Edit Tour' : 'Create Tour'}</h1>
            <p className="text-slate-500 mt-1 text-sm">Fill in the tour details below</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/admin/tours">Cancel</Link>
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Basic Information */}
            <SectionCard title="Basic Information" section="basic">
              <div className="space-y-5">
                <FormField
                  control={control}
                  name="title"
                  rules={{ required: 'Title is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tour Title <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Yerevan City Highlights" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category <span className="text-red-500">*</span></FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="group">Group Tour</SelectItem>
                            <SelectItem value="private">Private Tour</SelectItem>
                            <SelectItem value="package">Tour Package</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="region"
                    rules={{ required: 'Region is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Yerevan" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={control}
                  name="shortDescription"
                  rules={{ required: 'Required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Brief description" rows={2} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="fullDescription"
                  rules={{ required: 'Required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Description <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Detailed description" rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </SectionCard>

            {/* Pricing & Duration */}
            <SectionCard title="Pricing & Duration" section="pricing">
              <div className="space-y-5">
                <div className="grid grid-cols-3 gap-5">
                  <FormField
                    control={control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (USD) <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                            <Input type="number" className="pl-7" placeholder="45" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="originalPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Original Price</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                            <Input type="number" className="pl-7" placeholder="60" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="priceNote"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price Note</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="per person" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 gap-5">
                  <FormField
                    control={control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="8 hours" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="durationHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hours</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="durationDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Days</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </SectionCard>

            {/* Media */}
            <SectionCard title="Media & Images" section="media">
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium mb-3">Main Image</p>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-3">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                        <Upload className="w-5 h-5 text-slate-400 mb-1" />
                        <p className="text-xs text-slate-400">Click to upload</p>
                        <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'main')} />
                      </label>
                      <FormField
                        control={control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} placeholder="Or paste URL" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    {(uploadedImages.main[0] || image) && (
                      <div className="relative rounded-lg overflow-hidden border border-slate-200 h-32">
                        <img src={uploadedImages.main[0] || image} alt="Main" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => { setUploadedImages((prev) => ({ ...prev, main: [] })); setValue('image', ''); }}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-3">Gallery Images</p>
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors mb-4">
                    <ImageIcon className="w-5 h-5 text-slate-400 mb-1" />
                    <p className="text-xs text-slate-400">Click to add images</p>
                    <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleImageUpload(e, 'gallery')} />
                  </label>

                  {uploadedImages.gallery.length > 0 && (
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      {uploadedImages.gallery.map((url, i) => (
                        <div key={i} className="relative rounded-lg overflow-hidden border border-slate-200 group">
                          <img src={url} alt={`Gallery ${i}`} className="w-full h-20 object-cover" />
                          <button
                            type="button"
                            onClick={() => { setUploadedImages((prev) => ({ ...prev, gallery: prev.gallery.filter((_, idx) => idx !== i) })); removeGallery(i); }}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <Trash2 className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2">
                    {galleryFields.map((field, i) => (
                      <div key={field.id} className="flex gap-2">
                        <FormField
                          control={control}
                          name={`gallery.${i}` as any}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl><Input {...field} placeholder="Image URL" /></FormControl>
                            </FormItem>
                          )}
                        />
                        <Button variant="ghost" size="icon" type="button" onClick={() => removeGallery(i)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" type="button" className="w-full mt-3" onClick={() => appendGallery('' as any)}>
                    <Plus className="w-4 h-4" />
                    Add URL
                  </Button>
                </div>
              </div>
            </SectionCard>

            {/* Tour Details */}
            <SectionCard title="Tour Details" section="details">
              <div className="space-y-5">
                <div className="grid grid-cols-3 gap-5">
                  <FormField
                    control={control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty <span className="text-red-500">*</span></FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="challenging">Challenging</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" min="0" max="5" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="reviewCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reviews</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 gap-5">
                  <FormField
                    control={control}
                    name="minGroupSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Group Size <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="maxGroupSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Group Size <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="badge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Badge</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Best Seller" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={control}
                    name="meetingPoint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meeting Point <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Republic Square" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="startingPoint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Starting Point <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Yerevan" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={control}
                  name="pickupIncluded"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">Hotel pickup included</FormLabel>
                    </FormItem>
                  )}
                />

                <div>
                  <p className="text-sm font-medium mb-2">Languages</p>
                  <div className="space-y-2">
                    {languageFields.map((field, i) => (
                      <div key={field.id} className="flex gap-2">
                        <FormField
                          control={control}
                          name={`languages.${i}` as any}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl><Input {...field} placeholder="Language" /></FormControl>
                            </FormItem>
                          )}
                        />
                        <Button variant="ghost" size="icon" type="button" onClick={() => removeLanguage(i)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" type="button" className="w-full mt-2" onClick={() => appendLanguage('' as any)}>
                    <Plus className="w-4 h-4" />Add Language
                  </Button>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Tags</p>
                  <div className="space-y-2">
                    {tagFields.map((field, i) => (
                      <div key={field.id} className="flex gap-2">
                        <FormField
                          control={control}
                          name={`tags.${i}` as any}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl><Input {...field} placeholder="Tag" /></FormControl>
                            </FormItem>
                          )}
                        />
                        <Button variant="ghost" size="icon" type="button" onClick={() => removeTag(i)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" type="button" className="w-full mt-2" onClick={() => appendTag('' as any)}>
                    <Plus className="w-4 h-4" />Add Tag
                  </Button>
                </div>
              </div>
            </SectionCard>

            {/* Highlights */}
            <SectionCard title="Highlights" section="highlights">
              <div className="space-y-2">
                {highlightFields.map((field, i) => (
                  <div key={field.id} className="flex gap-2">
                    <FormField
                      control={control}
                      name={`highlights.${i}` as any}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl><Input {...field} placeholder="Highlight" /></FormControl>
                        </FormItem>
                      )}
                    />
                    <Button variant="ghost" size="icon" type="button" onClick={() => removeHighlight(i)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" type="button" className="w-full" onClick={() => appendHighlight('' as any)}>
                  <Plus className="w-4 h-4" />Add Highlight
                </Button>
              </div>
            </SectionCard>

            {/* Included & Excluded */}
            <div className="grid grid-cols-2 gap-5">
              <SectionCard title="Included Services" section="included">
                <div className="space-y-2">
                  {includedFields.map((field, i) => (
                    <div key={field.id} className="flex gap-2">
                      <FormField
                        control={control}
                        name={`included.${i}` as any}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl><Input {...field} placeholder="Service" /></FormControl>
                          </FormItem>
                        )}
                      />
                      <Button variant="ghost" size="icon" type="button" onClick={() => removeIncluded(i)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" type="button" className="w-full" onClick={() => appendIncluded('' as any)}>
                    <Plus className="w-4 h-4" />Add
                  </Button>
                </div>
              </SectionCard>

              <SectionCard title="Excluded Items" section="excluded">
                <div className="space-y-2">
                  {excludedFields.map((field, i) => (
                    <div key={field.id} className="flex gap-2">
                      <FormField
                        control={control}
                        name={`excluded.${i}` as any}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl><Input {...field} placeholder="Item" /></FormControl>
                          </FormItem>
                        )}
                      />
                      <Button variant="ghost" size="icon" type="button" onClick={() => removeExcluded(i)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" type="button" className="w-full" onClick={() => appendExcluded('' as any)}>
                    <Plus className="w-4 h-4" />Add
                  </Button>
                </div>
              </SectionCard>
            </div>

            {/* Departures */}
            <SectionCard title="Departure Schedule" section="departures">
              <div className="space-y-4">
                {departureFields.map((field, i) => (
                  <Card key={field.id} className="bg-slate-50">
                    <CardContent className="pt-5">
                      <div className="flex items-center justify-between mb-4">
                        <p className="font-medium text-sm">Departure {i + 1}</p>
                        <Button variant="ghost" size="icon" type="button" onClick={() => removeDeparture(i)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <FormField
                          control={control}
                          name={`departures.${i}.days`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Days</FormLabel>
                              <FormControl><Input {...field} placeholder="e.g., Daily" /></FormControl>
                            </FormItem>
                          )}
                        />
                        <div>
                          <p className="text-sm font-medium mb-2">Times</p>
                          <Controller
                            control={control}
                            name={`departures.${i}.times`}
                            render={({ field }) => (
                              <div className="space-y-2">
                                {(field.value || []).map((time, j) => (
                                  <div key={j} className="flex gap-2">
                                    <Input
                                      value={time}
                                      placeholder="09:00"
                                      onChange={(e) => { const t = [...(field.value || [])]; t[j] = e.target.value; field.onChange(t); }}
                                    />
                                    <Button variant="ghost" size="icon" type="button" onClick={() => { field.onChange((field.value || []).filter((_, idx) => idx !== j)); }}>
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button variant="outline" type="button" className="w-full text-sm" onClick={() => field.onChange([...(field.value || []), ''])}>
                                  <Plus className="w-3 h-3" />Add Time
                                </Button>
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" type="button" className="w-full" onClick={() => appendDeparture({ days: '', times: [] })}>
                  <Plus className="w-4 h-4" />Add Departure
                </Button>
              </div>
            </SectionCard>

            {/* Itinerary */}
            <SectionCard title="Itinerary" section="itinerary">
              <div className="space-y-4">
                {itineraryFields.map((field, i) => (
                  <Card key={field.id} className="bg-slate-50">
                    <CardContent className="pt-5">
                      <div className="flex items-center justify-between mb-4">
                        <p className="font-medium text-sm">Day {i + 1}</p>
                        <Button variant="ghost" size="icon" type="button" onClick={() => removeItinerary(i)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <FormField
                          control={control}
                          name={`itinerary.${i}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl><Input {...field} placeholder="Morning: City Tour" /></FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`itinerary.${i}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl><Textarea {...field} placeholder="Description" rows={3} /></FormControl>
                            </FormItem>
                          )}
                        />
                        <div>
                          <p className="text-sm font-medium mb-2">Stops</p>
                          <Controller
                            control={control}
                            name={`itinerary.${i}.stops`}
                            render={({ field }) => (
                              <div className="space-y-2">
                                {(field.value || []).map((stop, j) => (
                                  <div key={j} className="flex gap-2">
                                    <Input value={stop} placeholder="Stop" onChange={(e) => { const s = [...(field.value || [])]; s[j] = e.target.value; field.onChange(s); }} />
                                    <Button variant="ghost" size="icon" type="button" onClick={() => field.onChange((field.value || []).filter((_, idx) => idx !== j))}>
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button variant="outline" type="button" className="w-full text-sm" onClick={() => field.onChange([...(field.value || []), ''])}>
                                  <Plus className="w-3 h-3" />Add Stop
                                </Button>
                              </div>
                            )}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Meals</p>
                          <Controller
                            control={control}
                            name={`itinerary.${i}.meals`}
                            render={({ field }) => (
                              <div className="space-y-2">
                                {(field.value || []).map((meal, j) => (
                                  <div key={j} className="flex gap-2">
                                    <Input value={meal} placeholder="Meal" onChange={(e) => { const m = [...(field.value || [])]; m[j] = e.target.value; field.onChange(m); }} />
                                    <Button variant="ghost" size="icon" type="button" onClick={() => field.onChange((field.value || []).filter((_, idx) => idx !== j))}>
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button variant="outline" type="button" className="w-full text-sm" onClick={() => field.onChange([...(field.value || []), ''])}>
                                  <Plus className="w-3 h-3" />Add Meal
                                </Button>
                              </div>
                            )}
                          />
                        </div>
                        <FormField
                          control={control}
                          name={`itinerary.${i}.accommodation`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Accommodation</FormLabel>
                              <FormControl><Input {...field} placeholder="Hotel name" /></FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" type="button" className="w-full" onClick={() => appendItinerary({ day: itineraryFields.length + 1, title: '', description: '', stops: [], meals: [] })}>
                  <Plus className="w-4 h-4" />Add Day
                </Button>
              </div>
            </SectionCard>

            {/* FAQ */}
            <SectionCard title="FAQ" section="faq">
              <div className="space-y-4">
                {faqFields.map((field, i) => (
                  <Card key={field.id} className="bg-slate-50">
                    <CardContent className="pt-5">
                      <div className="flex items-center justify-between mb-4">
                        <p className="font-medium text-sm">Question {i + 1}</p>
                        <Button variant="ghost" size="icon" type="button" onClick={() => removeFaq(i)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <FormField
                          control={control}
                          name={`faq.${i}.question`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Question</FormLabel>
                              <FormControl><Input {...field} placeholder="Question" /></FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`faq.${i}.answer`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Answer</FormLabel>
                              <FormControl><Textarea {...field} placeholder="Answer" rows={3} /></FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" type="button" className="w-full" onClick={() => appendFaq({ question: '', answer: '' })}>
                  <Plus className="w-4 h-4" />Add Question
                </Button>
              </div>
            </SectionCard>

            {/* Sticky Actions */}
            <div className="flex gap-3 sticky bottom-0 bg-white border-t border-slate-200 p-4 -mx-8 px-8">
              <Button type="submit" className="flex-1">
                {isEdit ? 'Update Tour' : 'Create Tour'}
              </Button>
              <Button variant="outline" type="button" onClick={() => router.push('/admin/tours')}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
}
