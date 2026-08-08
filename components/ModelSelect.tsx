'use client';

import { useState, useEffect } from 'react';
import { TIER_ORDER, TIER_LABELS, modelsByTier, modelTier } from '@/lib/models';
import { useModelPrices, useHiddenModels } from '@/lib/useModelPrices';
import CustomModelModal, {
    type CustomModel,
    loadCustomModels,
    saveCustomModels,
} from './CustomModelModal';

interface Props {
    value: string;
    onChange: (model: string) => void;
    disabled?: boolean;
    /** aria-label for the <select> element */
    ariaLabel?: string;
    /** Additional className on the <select> element */
    className?: string;
    /** Whether to show the cost next to each model name in options (default true) */
    showCost?: boolean;
}

const CUSTOM_TRIGGER = '__custom__';

/**
 * Reusable model selector with tiered optgroups.
 * Includes custom model support — user-added models are persisted to localStorage.
 * Tiers are ranked by output cost per 1M tokens:
 *   Low  — under $3
 *   Mid  — $3 – $10
 *   High — $10+
 */
export default function ModelSelect({
    value,
    onChange,
    disabled = false,
    ariaLabel = 'Model',
    className = '',
    showCost = true,
}: Props) {
    const overrides = useModelPrices();
    const hidden = useHiddenModels();
    const builtinGroups = modelsByTier(overrides, hidden);

    const [customModels, setCustomModels] = useState<CustomModel[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    // Hydrate custom models from localStorage after mount
    useEffect(() => {
        setCustomModels(loadCustomModels());
    }, []);

    function handleChange(id: string) {
        if (id === CUSTOM_TRIGGER) {
            setModalOpen(true);
            return;
        }
        onChange(id);
    }

    function handleAdd(model: CustomModel) {
        const updated = [...customModels.filter((m) => m.id !== model.id), model];
        setCustomModels(updated);
        saveCustomModels(updated);
        onChange(model.id);
    }

    // Group custom models by tier
    const customByTier: Record<string, CustomModel[]> = { low: [], mid: [], high: [] };
    for (const m of customModels) {
        customByTier[modelTier(m)].push(m);
    }
    for (const tier of TIER_ORDER) {
        customByTier[tier].sort((a, b) => a.outputCost - b.outputCost);
    }

    const hasCustom = customModels.length > 0;

    return (
        <>
            <select
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                disabled={disabled}
                aria-label={ariaLabel}
                className={className}
            >
                {TIER_ORDER.map((tier) => {
                    const builtin = builtinGroups[tier];
                    const custom = customByTier[tier] ?? [];
                    const all = [...builtin, ...custom];
                    if (all.length === 0) return null;
                    return (
                        <optgroup
                            key={tier}
                            label={TIER_LABELS[tier]}
                            className="bg-surface-alt text-muted text-xs"
                        >
                            {all.map((m) => (
                                <option
                                    key={m.id}
                                    value={m.id}
                                    className="bg-surface-alt text-gold-accent normal-case tracking-normal text-sm"
                                >
                                    {showCost ? `${m.label}  —  ${m.cost}` : m.label}
                                </option>
                            ))}
                        </optgroup>
                    );
                })}

                {/* custom trigger */}
                <optgroup label="─────────────────" className="bg-surface-alt">
                    <option value={CUSTOM_TRIGGER} className="bg-surface-alt text-muted normal-case tracking-normal text-sm">
                        + Add custom model…
                    </option>
                </optgroup>
            </select>

            <CustomModelModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={handleAdd}
                existing={customModels}
            />
        </>
    );
}
