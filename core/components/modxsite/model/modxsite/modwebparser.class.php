<?php


class modWebParser {
    /**
     * A reference to the modX instance
     * @var modX $modx
     */
     
    public $modx= null; 
    
    /**
     * @param xPDO $modx A reference to the modX|xPDO instance
     */
    function __construct(xPDO &$modx) {
        $this->modx =& $modx;
    }
 
    public function setProcessingElement($arg = null) {
    } 
    
    public function processElementTags($parentTag, & $content, $processUncacheable= false, $removeUnprocessed= false, $prefix= "[[", $suffix= "]]", $tokens= array (), $depth= 0) {
        return $processed;
    } 
    
    public function collectElementTags($origContent, array &$matches, $prefix= '[[', $suffix= ']]') {
        return 0;
    }

    /**
     * Parses an element/tag property string or array definition.
     *
     * @param string $propSource A valid property string or array source to
     * parse.
     * @return array An associative array of property values parsed from
     * the property string or array definition.
     */
    public function parseProperties($propSource) {
        
        $properties= array ();
        
        if (!empty ($propSource)) {
            if (is_string($propSource)) {
                $properties = $this->parsePropertyString($propSource, true);
            } elseif (is_array($propSource)) {
                foreach ($propSource as $propName => $property) {
                    if (is_array($property) && array_key_exists('value', $property)) {
                        $properties[$propName]= $property['value'];
                    } else {
                        $properties[$propName]= $property;
                    }
                }
            }
        }
        return $properties;
    }
    
    public function isProcessingUncacheable() {
        $result = false;
        return $result;
    }
    
    public function isRemovingUnprocessed() {
        $result = false;
        return $result;
    }

    public function parsePropertyString($string, $valuesOnly = false) {
        $properties = array();
        return $properties;
    }
}