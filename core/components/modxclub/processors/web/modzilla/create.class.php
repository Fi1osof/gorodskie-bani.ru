<?php

class ModxclubProjectCreateProcessor extends modObjectCreateProcessor{
    public $permission = 'modxclub.create_projects';
    public $classKey = "ModxclubProject";
    
    public function initialize() {
        // Проверяем заголово проекта
        if(!$project_title = $this->getProperty('project_title')){
            $this->addFieldError('project_title',  $this->modx->lexicon('modxclub.project_title_empty'));
        }
        
        // Проверяем заголово задачи
        if(!$task_title = $this->getProperty('task_title')){
            $this->addFieldError('task_title',  $this->modx->lexicon('modxclub.task_title_empty'));
        }
        
        // Проверяем зкатегорию
        if(!$task_title = $this->getProperty('category')){
            $this->addFieldError('category',  $this->modx->lexicon('modxclub.category_empty'));
        }
        
        if($this->hasErrors()){
            return $this->modx->lexicon('modxclub.project_create_data_incorrect');
        }
        
        return parent::initialize();
    }
    
    
    public function getLanguageTopics(){
        return array_merge((array)parent::getLanguageTopics(), array(
            'modxclub:project',
            'modzilla:default',
            'modzilla:project',
            'modzilla:task',
        ));
    }
    
    function beforeSave() {
        $task = $this->modx->newObject('ModzillaTask',array(
            'title' => $this->getProperty('task_title'),
            'description' => preg_replace('/[\r\n]+/','<br/>',$this->getProperty('task_description')),
        ));
        
        $project = $this->modx->newObject('ModzillaProject', array(
            'title' => $this->getProperty('project_title'),
        ));
        $task->addOne($project);

        $this->object->set('category', $this->getProperty('category'));
        $this->object->addOne($task);

        return parent::beforeSave();
    }


    function cleanup(){
        return $this->success('Проект успешно опубликован', array(
            callback => "(function(){
                form.resetForm();
            })"
        ));
    }
}

return 'ModxclubProjectCreateProcessor';