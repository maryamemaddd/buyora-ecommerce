import React, { useEffect, useState } from 'react';
import { productService } from '../../services/productService';
import { Product } from '../../types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Electronics',
        stock: '',
        imageUrl: ''
    });

    const categories = ['Electronics', 'Clothing', 'Jewelry', 'Beauty', 'Home', 'Sports', 'Books'];

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await productService.getProducts({ limit: 1000 });
            const fetched = res.data?.products || res.data || [];
            setProducts(Array.isArray(fetched) ? fetched : []);
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price.toString(),
                category: product.category,
                stock: product.stock.toString(),
                imageUrl: product.image || product.images?.[0]?.url || ''
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                category: 'Electronics',
                stock: '',
                imageUrl: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await productService.deleteProduct(id);
                toast.success('Product deleted successfully');
                fetchProducts();
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
                category: formData.category,
                stock: Number(formData.stock),
                images: formData.imageUrl ? [{ url: formData.imageUrl }] : []
            };

            if (editingProduct) {
                await productService.updateProduct(editingProduct._id, payload);
                toast.success('Product updated successfully');
            } else {
                await productService.createProduct(payload);
                toast.success('Product created successfully');
            }

            setIsModalOpen(false);
            fetchProducts();
        } catch (error: any) {
            console.error("Product Error:", error, error.response?.data);
            const msg = error.response?.data?.message || error.response?.data?.errors?.[0]?.message || error.message || 'Operation failed';
            toast.error(msg);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 animate-fade-in">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-1">Manage Products</h1>
                    <p className="text-gray-500 dark:text-gray-400">Add, edit, or remove store products.</p>
                </div>
                <Button onClick={() => handleOpenModal()} className="flex items-center shadow-lg hover:shadow-brand-500/20 hover:-translate-y-1 transition-all duration-300">
                    <Plus className="w-5 h-5 mr-2" /> Add Product
                </Button>
            </div>

            <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl shadow-lg border border-gray-100 dark:border-white/10 overflow-hidden sm:rounded-[2rem] animate-fade-in opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-white/10">
                        <thead className="bg-gray-50 dark:bg-zinc-900/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-white/10">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center">
                                        <div className="flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white"></div></div>
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        No products available. Add one to get started.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product._id} className="hover:bg-brand-50/40 dark:hover:bg-zinc-800/60 transition-all duration-300 group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="shrink-0 h-10 w-10">
                                                    <img
                                                        className="h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-gray-100 dark:ring-zinc-800"
                                                        src={product.image || product.images?.[0]?.url || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&w=500&q=60'}
                                                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&w=500&q=60' }}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-gray-300">${Number(product.price).toFixed(2)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {product.stock}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {product.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => handleOpenModal(product)} className="text-indigo-600 dark:text-brand-400 hover:text-indigo-900 dark:hover:text-brand-300 mr-4">
                                                <Edit className="w-5 h-5 inline" />
                                            </button>
                                            <button onClick={() => handleDelete(product._id)} className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                                                <Trash2 className="w-5 h-5 inline" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900/50 dark:bg-black/80 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-5 sm:p-6 z-10 animate-fade-in-up border border-transparent dark:border-white/10">
                        <div className="flex justify-between items-center mb-5 border-b border-gray-100 dark:border-white/10 pb-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white" id="modal-title">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form id="product-form" onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Product Name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                                minLength={3}
                                maxLength={100}
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                <textarea
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm border p-2 bg-transparent dark:text-white dark:border-white/20"
                                    rows={3}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    minLength={10}
                                    maxLength={1000}
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Price ($)"
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Stock"
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={formData.stock}
                                    onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                <select
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm border p-2 bg-transparent dark:text-white dark:border-white/20 dark:[&>option]:bg-zinc-900"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    required
                                >
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <Input
                                label="Image URL"
                                value={formData.imageUrl}
                                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                required
                            />
                        </form>
                        <div className="mt-6 flex justify-end space-x-3">
                            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button form="product-form" type="submit">Save Product</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
