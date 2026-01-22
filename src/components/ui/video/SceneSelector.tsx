import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface SceneSelectorProps {
    scenes: string[];
    currentScene: string;
    onSelect: (scene: string) => void;
    onAddScene?: () => void;
    onRemoveScene?: (scene: string) => void;
}

export const SceneSelector: React.FC<SceneSelectorProps> = ({
    scenes,
    currentScene,
    onSelect,
    onAddScene,
    onRemoveScene,
}) => {
    return (
        <Card className="w-full">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Scenes</CardTitle>
                    {onAddScene && (
                        <Button variant="outline" size="sm" onClick={onAddScene}>
                            + Add
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                {scenes.map((scene, index) => (
                    <div
                        key={scene}
                        className={`flex items-center justify-between p-2 rounded-md ${
                            scene === currentScene
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary'
                        }`}
                    >
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onSelect(scene)}
                            className="flex-1 justify-start"
                        >
                            <span className="mr-2 opacity-50">{index + 1}.</span>
                            {scene}
                        </Button>
                        {onRemoveScene && scenes.length > 1 && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onRemoveScene(scene)}
                                className="opacity-50 hover:opacity-100"
                            >
                                ×
                            </Button>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

interface CompositionListProps {
    compositions: string[];
    current: string;
    onSelect: (comp: string) => void;
}

export const CompositionList: React.FC<CompositionListProps> = ({
    compositions,
    current,
    onSelect,
}) => {
    return (
        <Card className="w-full">
            <CardHeader className="pb-3">
                <CardTitle className="text-sm">Compositions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {compositions.map((comp) => (
                    <Button
                        key={comp}
                        variant={comp === current ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => onSelect(comp)}
                        className="w-full justify-start"
                    >
                        {comp}
                    </Button>
                ))}
            </CardContent>
        </Card>
    );
};
