import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  satisfaction: string;
  foundProduct: string;
  searchedProduct: string;
  wouldRecommend: string;
  suggestions: string;
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

const Survey: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    satisfaction: '',
    foundProduct: '',
    searchedProduct: '',
    wouldRecommend: '',
    suggestions: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };
    
    observerRef.current = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });
    
    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
      observerRef.current?.observe(section);
    });
    
    return () => {
      if (observerRef.current) {
        sections.forEach(section => {
          observerRef.current?.unobserve(section);
        });
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, formData[name as keyof FormData]);
  };

  const validateField = (name: string, value: string) => {
    let newErrors = { ...errors };
    
    if (name === 'email' && value && !/^\S+@\S+\.\S+$/.test(value)) {
      newErrors.email = 'Por favor, insira um email válido';
    } else if (name === 'phone' && value && !/^(\d{10,11}|\(\d{2}\)\s*\d{4,5}-\d{4})$/.test(value.replace(/\D/g, ''))) {
      newErrors.phone = 'Por favor, insira um telefone válido';
    } else if ((name === 'serviceType' || name === 'satisfaction' || name === 'foundProduct' || 
                name === 'searchedProduct' || name === 'wouldRecommend') && !value) {
      newErrors[name as keyof FormErrors] = 'Este campo é obrigatório';
    } else {
      delete newErrors[name as keyof FormErrors];
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    const requiredFields: (keyof FormData)[] = [
      'serviceType', 'satisfaction', 'foundProduct', 'searchedProduct', 'wouldRecommend'
    ];
    
    let newErrors: FormErrors = {};
    let isValid = true;
    
    let newTouched = { ...touched };
    requiredFields.forEach(field => {
      newTouched[field] = true;
      if (!formData[field]) {
        newErrors[field] = 'Este campo é obrigatório';
        isValid = false;
      }
    });
    
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido';
      newTouched.email = true;
      isValid = false;
    }
    
    if (formData.phone && !/^(\d{10,11}|\(\d{2}\)\s*\d{4,5}-\d{4})$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Por favor, insira um telefone válido';
      newTouched.phone = true;
      isValid = false;
    }
    
    setTouched(newTouched);
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mblongbn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: '',
          satisfaction: '',
          foundProduct: '',
          searchedProduct: '',
          wouldRecommend: '',
          suggestions: ''
        });
        setTouched({});
      } else {
        throw new Error('Falha ao enviar o formulário');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 px-4 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-2 text-center fade-in-section">Sua opinião nos ajuda a crescer!</h1>
      <p className="text-gray-600 mb-8 text-center fade-in-section" style={{ transitionDelay: '100ms' }}>Conte-nos sobre sua experiência com a Ke.fi Concept</p>

      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center animate-fadeIn">
          <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-medium text-green-800 mb-3">Obrigado pelo seu feedback!</h2>
          <p className="text-green-700 mb-4">
            Sua opinião é muito importante para nós e nos ajudará a melhorar nossos produtos e serviços.
          </p>
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                serviceType: '',
                satisfaction: '',
                foundProduct: '',
                searchedProduct: '',
                wouldRecommend: '',
                suggestions: ''
              });
              setTouched({});
            }}
            className="btn btn-primary"
          >
            Enviar outro feedback
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 fade-in-section" style={{ transitionDelay: '200ms' }}>
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4 pb-2 border-b">Informações Pessoais (Opcional)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="name" className="form-label">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-input"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${touched.email && errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-xs mt-1 animate-fadeIn">{errors.email}</p>
                )}
              </div>
              
              <div className="mb-4 md:col-span-2">
                <label htmlFor="phone" className="form-label">Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${touched.phone && errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="(XX) XXXXX-XXXX"
                />
                {touched.phone && errors.phone && (
                  <p className="text-red-500 text-xs mt-1 animate-fadeIn">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4 pb-2 border-b">Sua Experiência</h2>
            
            <div className="mb-4">
              <label htmlFor="serviceType" className="form-label">Tipo de atendimento *</label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-select ${touched.serviceType && errors.serviceType ? 'border-red-500 focus:ring-red-500' : ''}`}
                required
              >
                <option value="">Selecione uma opção</option>
                <option value="presencial">Atendimento Presencial</option>
                <option value="online">Atendimento Online</option>
                <option value="telefone">Atendimento por Telefone</option>
              </select>
              {touched.serviceType && errors.serviceType && (
                <p className="text-red-500 text-xs mt-1 animate-fadeIn">{errors.serviceType}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="satisfaction" className="form-label">Quão satisfeito(a) você ficou com o atendimento? *</label>
              <select
                id="satisfaction"
                name="satisfaction"
                value={formData.satisfaction}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-select ${touched.satisfaction && errors.satisfaction ? 'border-red-500 focus:ring-red-500' : ''}`}
                required
              >
                <option value="">Selecione uma opção</option>
                <option value="muito">Muito Satisfeito(a)</option>
                <option value="satisfeito">Satisfeito(a)</option>
                <option value="neutro">Neutro</option>
                <option value="insatisfeito">Insatisfeito(a)</option>
                <option value="muito_insatisfeito">Muito Insatisfeito(a)</option>
              </select>
              {touched.satisfaction && errors.satisfaction && (
                <p className="text-red-500 text-xs mt-1 animate-fadeIn">{errors.satisfaction}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="foundProduct" className="form-label">Você encontrou o produto que procurava? *</label>
              <select
                id="foundProduct"
                name="foundProduct"
                value={formData.foundProduct}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-select ${touched.foundProduct && errors.foundProduct ? 'border-red-500 focus:ring-red-500' : ''}`}
                required
              >
                <option value="">Selecione uma opção</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
                <option value="parcialmente">Parcialmente</option>
              </select>
              {touched.foundProduct && errors.foundProduct && (
                <p className="text-red-500 text-xs mt-1 animate-fadeIn">{errors.foundProduct}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="searchedProduct" className="form-label">Qual produto você estava procurando? *</label>
              <input
                type="text"
                id="searchedProduct"
                name="searchedProduct"
                value={formData.searchedProduct}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${touched.searchedProduct && errors.searchedProduct ? 'border-red-500 focus:ring-red-500' : ''}`}
                required
              />
              {touched.searchedProduct && errors.searchedProduct && (
                <p className="text-red-500 text-xs mt-1 animate-fadeIn">{errors.searchedProduct}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="wouldRecommend" className="form-label">Você indicaria nossa loja para amigos e familiares? *</label>
              <select
                id="wouldRecommend"
                name="wouldRecommend"
                value={formData.wouldRecommend}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-select ${touched.wouldRecommend && errors.wouldRecommend ? 'border-red-500 focus:ring-red-500' : ''}`}
                required
              >
                <option value="">Selecione uma opção</option>
                <option value="sim">Sim, com certeza</option>
                <option value="talvez">Talvez</option>
                <option value="nao">Não</option>
              </select>
              {touched.wouldRecommend && errors.wouldRecommend && (
                <p className="text-red-500 text-xs mt-1 animate-fadeIn">{errors.wouldRecommend}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="suggestions" className="form-label">Sugestões ou comentários adicionais</label>
              <textarea
                id="suggestions"
                name="suggestions"
                value={formData.suggestions}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={4}
                className="form-textarea"
              ></textarea>
            </div>
          </div>
          
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary inline-flex items-center transform transition-all active:scale-95"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-shimmer inline-block w-4 h-4 rounded-full mr-2"></span>
                  Enviando...
                </>
              ) : (
                <>
                  Enviar feedback <Send size={16} className="ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Survey;