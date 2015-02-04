<?php

class ModxclubModzillaCategoryGetlistProcessor extends modProcessor{
    public $permission = '';
    public $classKey = 'modResource';
    
    public function getLanguageTopics() {
        return array_merge( (array)parent::getLanguageTopics(), array(
            "modxclub:default",
        ));
    }
    
    public function process(){
        $result = array();
        $c = $this->modx->newQuery($this->classKey);
        $c->select(array(
            'id',
            'pagetitle as title',
        ));
        $c->where(array(
            'parent' => 35,
            'deleted' => false,
            'hidemenu'  => false,
            'published' =>true,
        ));
        if($c->prepare() && $c->stmt->execute() && $rows = $c->stmt->fetchAll(PDO::FETCH_ASSOC)){
            $result = $rows;
        }
        if(!$result){
            return $this->modx->lexicon("modxclub.cannot_get_category_list");
        }
        else return $this->success('', $result);
    }
    
}
return 'ModxclubModzillaCategoryGetlistProcessor';